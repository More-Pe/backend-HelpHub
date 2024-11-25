import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDocument, Upload } from './entities/file.schema';
import { join } from 'path';
import { unlink } from 'fs';
import { CreateUploadServiceDto } from './dto/create-upload-service.dto';
import * as fs from 'fs'; // Importa el módulo fs para eliminar archivos

@Injectable()
export class UploadServiceService {
  constructor(
    @InjectModel(Upload.name) private readonly fileModel: Model<Upload>,
  ) {}
  //function that check if exist imageprofile in the user, and if not add one
  async profileFileUpload(
    file: Express.Multer.File,
    user_id: CreateUploadServiceDto,
  ) {
    try {
      const { id_user } = user_id;
      const imageExists = await this.fileModel.find({ id_user: id_user });
      if (imageExists.length == 1) {
        throw new NotFoundException('Sorry!');
      } else {
        const nameFile = file.originalname;
        const imageCreate = await this.fileModel.create({
          filename: nameFile,
          filepath: file.path,
          mimetype: file.mimetype,
          size: file.size,
          id_user: id_user,
        });
        await imageCreate.save();
        return {
          message: 'File uploaded successfully',
          id_image: imageCreate.id,
        };
      }
    } catch {
      fs.unlinkSync(`./uploads-profiles/${file.filename}`); // Elimina el archivo
      throw new NotAcceptableException({
        error: 'Error founded!',
      });
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

  //Look if file exists by id_user.
  async getFileByIdUser(id_user: string): Promise<FileDocument> {
    try {
      const userExists = await this.fileModel.findOne({ id_user: id_user });
      if (userExists != null) return userExists;
      else {
        throw new NotFoundException({
          error: 'Not founded',
        });
      }
    } catch (error) {
      throw new NotFoundException({
        error: 'Not founded',
      });
    }
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
        });
      }
    });

    // Finally we delete it in Mongo DB
    await this.fileModel.findByIdAndDelete(id);
  }

  async removeFileByUserId(id_user: string): Promise<void> {
    try {
      const profile_image = await this.fileModel
        .findOne({ id_user })
        .populate('_id')
        .exec();

      if (!profile_image) {
        throw new NotFoundException('Profile Image not found for this user');
      }
      // If exist this image, will send full path to be unlinked in the directory.
      const filePath = join(process.cwd(), profile_image.filepath);
      unlink(filePath, (err) => {
        if (err) {
          throw new NotAcceptableException({
            error: 'Error founded!',
          });
        }
      });

      // Finally we delete it in Mongo DB
      await this.fileModel.findByIdAndDelete(profile_image._id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error fetching profile_image',
        details: error.message,
      });
    }
  }

  //update image in foleder with new path, and in bbdd.
  async updateImageByUserId(
    id_user: string,
    file: Express.Multer.File,
  ): Promise<any> {
    try {
      const existingImage = await this.fileModel.findOne({ id_user: id_user });
      if (!existingImage) {
        throw new NotFoundException('No image found for this user');
      }

      // Delete old image
      const filePath = join(process.cwd(), existingImage.filepath);
      unlink(filePath, (err) => {
        if (err) {
          throw new NotAcceptableException({
            error: 'Error deleting the old image',
          });
        }
      });

      // Update new properities for new image
      existingImage.filename = file.originalname;
      existingImage.filepath = file.path;
      existingImage.mimetype = file.mimetype;
      existingImage.size = file.size;

      await existingImage.save();

      return {
        message: 'Image updated successfully',
        id_image: existingImage.id,
      };
    } catch (error) {
      throw new NotAcceptableException({
        error: 'Error updating image',
        details: error.message,
      });
    }
  }
}
