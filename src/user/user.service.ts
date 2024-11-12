import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import * as argon2 from "argon2";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }
  //Register new user.
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { email ,... UserData } = createUserDto;
      let {password} = createUserDto;
      const passEncrypted = await argon2.hash(password);
      const userExists = await this.userModel.find({ email: email });
      if (userExists.length == 1) {
        throw new NotAcceptableException({
        })
      }
      else {
        const userCreate = await this.userModel.create({email:email,password:passEncrypted,nameUser:createUserDto.nameUser,surnameUser:createUserDto.surnameUser,phone:createUserDto.phone,showPhone:createUserDto.showPhone,optionCall:createUserDto.optionCall,blocked:createUserDto.blocked});
        return userCreate.save();
      }

    } catch {
      throw new NotAcceptableException({

        error: 'Error founded!',
      })
    }
  }
  //Search all users
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
  //Update dates of user
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
  //find by email some user.
  async findOne(email: string) {
    try {
      const userExists = await this.userModel.find({ email: email });
      return userExists;

    } catch (error) {
      throw new NotFoundException({

        error: 'Not founded',
      })
    }
  }

  //find user by _id for search some user.
  async findOneByIdUser(id: string) {
    try {
      const userExists = await this.userModel.findById(id).exec();
      if(!userExists)
      {
        throw new NotFoundException({

          error: 'Not founded',
        })
      }
      return userExists;

    } catch (error) {
      throw new NotFoundException({

        error: 'Not founded',
      })
    }
  }
}
