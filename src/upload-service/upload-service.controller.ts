import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { UploadServiceService } from './upload-service.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUploadServiceDto } from './dto/create-upload-service.dto';

@Controller('upload-service')
@ApiTags('Upload-Service')
export class UploadServiceController {
  constructor(private readonly uploadService: UploadServiceService) { }

  @Post('upload-profileImage')
  @ApiOperation({ summary: 'Upload new profile image' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 406, description: 'Not acceptable' })
  @ApiResponse({ status: 201, description: 'Uploaded' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Sube un archivo y proporciona una descripción',
    type: CreateUploadServiceDto,
    required: true,
    // waiting for type binary file, named image_profile
    schema: {
      type: 'object',
      properties: {
        image_profile: {
          type: 'string',
          format: 'binary', // That is file
        },
        id_user: {
          type: 'string',
        },
      },
      required: ['image_profile', 'id_user'], // Mandatory fields
    },
  })
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
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Body() id_user: CreateUploadServiceDto) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      return this.uploadService.profileFileUpload(file, id_user);
    } catch (error) {
      throw error;
    }
  }

  @Get('profile-image/:id')
  @ApiOperation({ summary: 'Get profile image by ID' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({ description: 'No profile-image found!' })
  async getFile(@Param('id') id: string, @Res() res: any) {
    const file = await this.uploadService.getFileById(id);
    const filePath = join(process.cwd(), file.filepath); // 
    return res.sendFile(filePath); // Returns directly image path.
  }

  @Get('profile-imageByUser/:id')
  @ApiOperation({ summary: 'Get profile image by ID-User' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiNotFoundResponse({ description: 'No profile-image found!' })
  async getFileByUser(@Param('id') id: string, @Res() res: any) {
    const file = await this.uploadService.getFileByIdUser(id);
    const filePath = join(process.cwd(), file.filepath); // 
    return res.sendFile(filePath); // Returns directly image path.
  }

  @Delete('profile-image/:id')
  @ApiOperation({ summary: 'Delete Image profile by ID' })
  @ApiResponse({ status: 200, description: 'Deleted Sucessfully' })
  @ApiNotFoundResponse({ description: 'No profile-image found!' })
  async removeImageProfile(@Param('id') id: string) {
    await this.uploadService.removeFileById(id);
    return { message: 'Image deleted successfully' };
  }
}
