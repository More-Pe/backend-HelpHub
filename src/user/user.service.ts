import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
  //Registrar un usuario nuevo (vendrá desde link del correo para el registro)
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email } = createUserDto;
      const userExists = await this.userModel.find({ email: email });
      if (userExists.length == 1) {
        throw new NotAcceptableException({
        })
      }
      else {
        const userCreate = await this.userModel.create(createUserDto);
        return userCreate.save();
      }

    } catch {
      throw new NotAcceptableException({

        error: 'Error founded!',
      })
    }
  }
  //Listar todos los usuarios
  async findAll() {
    try {
      const users = await this.userModel.find();
      return users;

    } catch (error) {
      throw new NotFoundException({

        error: 'No users!',
      })
    }
  }
  //Actualizar cualqueira de los 5 datos indicados.
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const { nameUser, surnameUser, phone, optionCall, showPhone } = updateUserDto;

      const userUpdate = await this.userModel.findByIdAndUpdate(id, { nameUser: nameUser, surnameUser: surnameUser, phone: phone, optionCall: optionCall, showPhone: showPhone });
      return "User" + ' ' + userUpdate.id + ' ' + "it was updated.";

    } catch (error) {
      throw new NotFoundException({

        error: 'Not founded!',
      })
    }
  }
  //encontrar un cliente por nºde Cliente en la bbdd
  async findOne(email: string) {
    try {
      const userExists = await this.userModel.find({ email: email });
      console.log(userExists);
      return userExists;

    } catch (error) {
      throw new NotFoundException({

        error: 'Not founded',
      })
    }
  }
}
