import {
  Controller,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin/uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(private uploadsService: UploadsService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', { storage: undefined }))
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/i }),
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('productId') productId: string,
    @Body('altText') altText?: string,
  ) {
    return this.uploadsService.uploadImage(file, productId, altText);
  }

  @Delete(':publicId(*)')
  deleteImage(@Param('publicId') publicId: string) {
    return this.uploadsService.deleteImage(publicId);
  }

  @Patch('primary/:imageId')
  setPrimary(@Param('imageId') imageId: string) {
    return this.uploadsService.setPrimary(imageId);
  }

  @Patch('order/:productId')
  updateOrder(
    @Param('productId') productId: string,
    @Body('imageIds') imageIds: string[],
  ) {
    return this.uploadsService.updateOrder(productId, imageIds);
  }
}
