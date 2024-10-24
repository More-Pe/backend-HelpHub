import { Injectable, NotAcceptableException, NotFoundException, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UpdateUploadServiceDto } from './dto/update-upload-service.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument, Upload } from './entities/file.schema';
import { join } from 'path';
import { unlink } from 'fs';


@Injectable()
export class UploadServiceService {
  constructor(@InjectModel(Upload.name) private readonly fileModel: Model<Upload>) { }
//function that check if exist imageprofile in the user, and if not add one
  async handleFileUpload(file: Express.Multer.File, id_user: string) {
    try {
      const imageExists = await this.fileModel.find({ id_user: id_user });
      if (imageExists.length == 1) {
        return 'Image profile already exists'
      }
      else {
        const paco = file.originalname;
        const imageCreate = await this.fileModel.create({ filename: paco, filepath: file.path, mimetype: file.mimetype, size: file.size, id_user: id_user });
        await imageCreate.save();
        return {
          message: 'File uploaded successfully',
          id_image: imageCreate.id
        }
      }
    } catch {
      throw new NotAcceptableException({
        error: 'Error founded!',
      })
    }
  }
  //Look if file exists by id.
  async getFileById(id: string): Promise<FileDocument> {
    const file = await this.fileModel.findById(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  update(id: number, updateUploadServiceDto: UpdateUploadServiceDto) {
    return `This action updates a #${id} uploadService`;
  }

  async removeFileById(id: string): Promise<void> {
    const file = await this.fileModel.findById(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }

    // If exist this image, will send full path to be unlinked in the directory.
    const filePath = join(process.cwd(), file.filepath); 
    unlink(filePath, (err) => {
      if (err) {
        throw new NotAcceptableException({
          error: 'Error founded!',
        })
      }
    });

    // Finally we delete it in Mongo DB
    await this.fileModel.findByIdAndDelete(id);
  }
}
