import { ConflictException, ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateHabilityDto } from './dto/create-hability.dto';
import { UpdateHabilityDto } from './dto/update-hability.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hability } from './entities/hability.schema';
import { Model } from 'mongoose';

@Injectable()
export class HabilityService {
  constructor(@InjectModel(Hability.name) private readonly habilityModel: Model<Hability>) { }
  async createHability(createHabilityDto: CreateHabilityDto, userId: string): Promise<Hability> {
    try {
      const title = createHabilityDto.title;
      //Check first if exists the same title in the same user of course.
      const existingTitle = await this.habilityModel.find({ title: title, user_id: userId });
      if (existingTitle.length >= 1) {
        throw new ConflictException('Title of this hability already exists');
      }
      const habilityCreate = await this.habilityModel.create({
        ...createHabilityDto,
        user_id: userId,
      });
      return habilityCreate.save();
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error creating hability!!',
      });
    }
  }
  //Find all habilities in the platdorm (admin view)
  async findAll(): Promise<Hability[]> {
    try {
      const habilities = await this.habilityModel.find();
      if (habilities.length == 0) {
        throw new NotFoundException({
        })
      }
      else
        return habilities;

    } catch (error) {
      throw new NotFoundException({

        error: 'Error founded(maybe not habilities)!',
      })
    }
  }

  //Find all habilities for the user
  async findUsersHabilities(id_user: string): Promise<Hability[]> {
    try {
      const habilities = await this.habilityModel.find({ user_id: id_user });
      if (habilities.length == 0) {
        throw new NotFoundException({
        })
      }
      else
        return habilities;

    } catch (error) {
      throw new NotFoundException({

        error: 'Error founded(maybe not habilities in this user)!',
      })
    }
  }
  //Find one hability by id
  async findOneById(_id: string): Promise<Hability> {
    try {
      const hability = await this.habilityModel.findOne({ _id });
      if (!hability) {
        throw new NotFoundException('Hability not found for this user');
      }
      return hability;

    } catch (error) {
      throw new NotFoundException({

        error: 'Not found!',
      })
    }
  }
  //Find habilities by category.
  async findOneByCategory(category: string): Promise<Hability[]> {
    try {
      const habilities = await this.habilityModel.find({ category: category });
      if (habilities.length == 0) {
        throw new NotFoundException({
        })
      }
      else
        return habilities;

    } catch (error) {
      throw new NotFoundException({

        error: 'Not found!',
      })
    }
  }
//Update hability with fields wishes by ID
  async updateHability(id: string, updateHabilityDto: UpdateHabilityDto, user_id: string) {
    try {
      // Verify sure that the hability by ID to update is created by this user.
      const userValid = await this.habilityModel.find({ _id: id, user_id: user_id });
      if (!userValid) {
        throw new NotFoundException({
          error: 'Not found!',
        })
      }
      else {
        const { title, level, mode, description, category } = updateHabilityDto;

        const habilityUpdate = await this.habilityModel.findByIdAndUpdate(id, { title: title, level: level, mode: mode, description: description, category: category });
        return "Hability" + ' ' + habilityUpdate.id + ' ' + "was updated!";
      }


    } catch (error) {
      throw new NotFoundException({

        error: 'Not found!',
      })
    }
  }
  //Remove hability by ID
  async removeHability(_id: string) {
    try {
      const hability = await this.habilityModel.findByIdAndDelete(_id);
      if (hability == null) {
        return "Fail to remove, maybe does not exists!";
      }
      return "Hability with id:" + ' ' + hability._id + ' ' + "was removed successfully.";

    } catch (error) {
      throw new NotFoundException({

        error: 'Not found!',
      })
    }
  }
}
