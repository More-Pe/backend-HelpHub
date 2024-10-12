import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Profile,
  ProfileDocument
} from './entities/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  //Create profile
  async createProfile(createProfileDto: CreateProfileDto, userId: string): Promise<Profile> {
    try {
      const profileCreate = await this.profileModel.create({ ...createProfileDto, user: userId });
      return profileCreate.save();
    } catch (error) {
      throw new NotAcceptableException({
        error: 'Error creating profile',
      });
    }
  }

  //Get all profiles
  async findAll(): Promise<Profile[]> {
    try {
      const profiles = await this.profileModel.find().populate('user');
      return profiles;
    } catch (error) {
      throw new NotFoundException({
        error: 'No profiles found',
      });
    }
  }

  //Update profile
  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<string> {
    try {
      const profileUpdate = await this.profileModel.findByIdAndUpdate(id, updateProfileDto, { new: true });
      if (!profileUpdate) {
        throw new NotFoundException({
          error: 'Profile not found',
        });
      }
      return `Profile ${profileUpdate.id} updated successfully.`;
    } catch (error) {
      throw new NotFoundException({
        error: 'Error updating profile',
      });
    }
  }

  //Get profile by ID
  async findOne(id: string): Promise<Profile> {
    try {
      const profile = await this.profileModel.findById(id).populate('user');
      if (!profile) {
        throw new NotFoundException({
          error: 'Profile not found',
        });
      }
      return profile;
    } catch (error) {
      throw new NotFoundException({
        error: 'Profile not found',
      });
    }
  }
}
