import {
  Injectable,
  NotAcceptableException,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './entities/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  // Create profile
  async createProfile(
    createProfileDto: CreateProfileDto,
    userId: string,
  ): Promise<Profile> {
    try {
      const existingProfile = await this.profileModel.findOne({
        userId: userId,
      });

      if (existingProfile) {
        throw new ConflictException('User already has a profile');
      }

      const profileCreate = await this.profileModel.create({
        ...createProfileDto,
        userId: userId,
      });

      return profileCreate;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new NotAcceptableException({
        error: 'Error creating profile',
        details: error.message,
      });
    }
  }

  // Get all profiles
  async findAll(): Promise<Profile[]> {
    try {
      const profiles = await this.profileModel
        .find()
        .populate('userId', '_id')
        .exec();

      if (!profiles || profiles.length === 0) {
        throw new NotFoundException('No profiles found');
      }

      return profiles;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error fetching profiles',
        details: error.message,
      });
    }
  }

  async update(
    id: string,
    updateProfileDto: UpdateProfileDto,
    userId: string,
  ): Promise<Profile> {
    const profile = await this.profileModel.findById(id);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    // Verificar que el perfil pertenece al usuario autenticado
    if (profile.userId.toString() !== userId) {
      throw new ForbiddenException(
        'You do not have permission to update this profile',
      );
    }

    // Actualizar solo los campos proporcionados en el DTO
    Object.assign(profile, updateProfileDto);

    return await profile.save();
  }

  // Get profile by ID
  async findOne(id: string): Promise<Profile> {
    try {
      const profile = await this.profileModel
        .findById(id)
        .populate('userId', '_id')
        .exec();

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      return profile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error fetching profile',
        details: error.message,
      });
    }
  }

  // Get profile by user ID
  async findByUserId(userId: string): Promise<Profile> {
    try {
      const profile = await this.profileModel
        .findOne({ userId })
        .populate('userId', '_id')
        .exec();

      if (!profile) {
        throw new NotFoundException('Profile not found for this user');
      }

      return profile;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error fetching profile',
        details: error.message,
      });
    }
  }
}