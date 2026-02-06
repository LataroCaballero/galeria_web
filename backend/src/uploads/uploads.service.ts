import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    productId: string,
    altText?: string,
  ) {
    // Verify product exists
    const product = await this.prisma.product.findFirst({
      where: { id: productId, deletedAt: null },
    });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: 'galeria/productos',
            transformation: [
              { width: 1200, height: 1200, crop: 'limit' },
              { quality: 'auto:good' },
              { fetch_format: 'auto' },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(file.buffer);
    });

    // Check if this is the first image (make it primary)
    const existingImages = await this.prisma.productImage.count({
      where: { productId },
    });

    // Save to database
    const image = await this.prisma.productImage.create({
      data: {
        productId,
        cloudinaryUrl: result.secure_url,
        cloudinaryPublicId: result.public_id,
        altText: altText || product.name,
        isPrimary: existingImages === 0,
        order: existingImages,
      },
    });

    return image;
  }

  async deleteImage(publicId: string) {
    const image = await this.prisma.productImage.findFirst({
      where: { cloudinaryPublicId: publicId },
    });

    if (!image) {
      throw new NotFoundException('Imagen no encontrada');
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Delete from database
    await this.prisma.productImage.delete({ where: { id: image.id } });

    return { message: 'Imagen eliminada' };
  }

  async setPrimary(imageId: string) {
    const image = await this.prisma.productImage.findUnique({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException('Imagen no encontrada');
    }

    // Unset all primary for this product
    await this.prisma.productImage.updateMany({
      where: { productId: image.productId },
      data: { isPrimary: false },
    });

    // Set this one as primary
    return this.prisma.productImage.update({
      where: { id: imageId },
      data: { isPrimary: true },
    });
  }

  async updateOrder(productId: string, imageIds: string[]) {
    const updates = imageIds.map((id, index) =>
      this.prisma.productImage.update({
        where: { id },
        data: { order: index },
      }),
    );

    await Promise.all(updates);
    return { message: 'Orden actualizado' };
  }
}
