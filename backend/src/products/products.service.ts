import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic(query: QueryProductDto) {
    const { page = 1, limit = 20, category, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      status: 'PUBLISHED',
      deletedAt: null,
      ...(category && {
        category: { slug: category },
      }),
      ...(search && {
        name: { contains: search, mode: 'insensitive' },
      }),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: {
            orderBy: [{ isPrimary: 'desc' }, { order: 'asc' }],
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
        deletedAt: null,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { order: 'asc' } },
      },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async findAllAdmin(query: QueryProductDto) {
    const { page = 1, limit = 20, category, categoryId, status, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      deletedAt: null,
      ...(categoryId && { categoryId }),
      ...(!categoryId && category && {
        category: { slug: category },
      }),
      ...(status && { status }),
      ...(search && {
        name: { contains: search, mode: 'insensitive' },
      }),
    };

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { order: 'asc' }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOneAdmin(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: {
        category: true,
        images: { orderBy: { order: 'asc' } },
      },
    });

    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    return product;
  }

  async create(dto: CreateProductDto) {
    const slug =
      dto.slug || slugify(dto.name, { lower: true, strict: true });

    return this.prisma.product.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description,
        price: dto.price,
        categoryId: dto.categoryId,
        specifications: dto.specifications || undefined,
        status: dto.status || 'DRAFT',
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: true,
      },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOneAdmin(id);

    const data: Prisma.ProductUpdateInput = {
      ...(dto.name && { name: dto.name }),
      ...(dto.slug && { slug: dto.slug }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.price && { price: dto.price }),
      ...(dto.categoryId && { category: { connect: { id: dto.categoryId } } }),
      ...(dto.specifications !== undefined && {
        specifications: dto.specifications,
      }),
      ...(dto.status && { status: dto.status }),
    };

    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { order: 'asc' } },
      },
    });
  }

  async remove(id: string) {
    await this.findOneAdmin(id);

    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async publish(id: string) {
    await this.findOneAdmin(id);

    return this.prisma.product.update({
      where: { id },
      data: { status: 'PUBLISHED' },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { order: 'asc' } },
      },
    });
  }
}
