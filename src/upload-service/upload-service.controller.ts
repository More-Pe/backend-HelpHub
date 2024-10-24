import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { UploadServiceService } from './upload-service.service';
import { UpdateUploadServiceDto } from './dto/update-upload-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('upload-service')
export class UploadServiceController {
  constructor(private readonly uploadService: UploadServiceService) { }

  @Post('upload-profileImage')
  @UseInterceptors(FileInterceptor('image_profile', {
    storage: diskStorage({
      destination: './uploads-profiles',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`); //sure that images never will have same name
      },
    }),
    fileFilter: (req, file, cb) => {
      const allowedFormat = ['image/png', 'image/jpeg'];
      if (!allowedFormat.includes(file.mimetype)) {       // Just check if the images support format
        return cb(new BadRequestException('Only PNG and JPEG files are allowed'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 6 * 1024 * 1024, // Limit 6MB image perfil
    },
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body('id_user') id_user: string) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.uploadService.handleFileUpload(file, id_user);
  }

  @Get('profile-image/:id')
  async getFile(@Param('id') id: string, @Res() res: any) {
    const file = await this.uploadService.getFileById(id);
    const filePath = join(process.cwd(), file.filepath); // 
    return res.sendFile(filePath); // Returns directly image path.
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadServiceDto: UpdateUploadServiceDto) {
    return this.uploadService.update(+id, updateUploadServiceDto);
  }

  @Delete('profile-image/:id')
  async removeImageProfile(@Param('id') id: string) {
    await this.uploadService.removeFileById(id);
    return { message: 'Image deleted successfully' };
  }
}
