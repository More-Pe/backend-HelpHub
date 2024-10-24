import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateHelpRequestDto } from './dto/create-help_request.dto';
import { UpdateHelpRequestDto } from './dto/update-help_request.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  HelpRequest,
  HelpRequestDocument,
} from './entities/help_request.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class HelpRequestService {
  constructor(
    @InjectModel(HelpRequest.name)
    private readonly helpRequestModel: Model<HelpRequestDocument>,
  ) {}

  // Create help request
  async createHelpRequest(
    createHelpRequestDto: CreateHelpRequestDto,
    userId: string,
  ): Promise<HelpRequest> {
    try {
      const helpRequestCreate = await this.helpRequestModel.create({
        ...createHelpRequestDto,
        userId: userId,
        createdAt: new Date(),
      });

      return helpRequestCreate;
    } catch (error) {
      throw new NotAcceptableException({
        error: 'Error creating help request',
        details: error.message,
      });
    }
  }

  // Get all help requests
  async findAll(): Promise<HelpRequest[]> {
    try {
      const helpRequests = await this.helpRequestModel
        .find()
        .populate('userId', '_id')
        .sort({ createdAt: -1 })
        .exec();

      if (!helpRequests || helpRequests.length === 0) {
        throw new NotFoundException('No help requests found');
      }

      return helpRequests;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error fetching help requests',
        details: error.message,
      });
    }
  }

  // Get help request by ID
  async findOne(id: string): Promise<HelpRequest> {
    try {
      const helpRequest = await this.helpRequestModel
        .findById(id)
        .populate('userId', '_id')
        .exec();

      if (!helpRequest) {
        throw new NotFoundException('Help request not found');
      }

      return helpRequest;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error fetching help request',
        details: error.message,
      });
    }
  }

  // Update help request
  async update(
    id: string,
    updateHelpRequestDto: UpdateHelpRequestDto,
    userId: string,
  ): Promise<HelpRequest> {
    try {
      const helpRequest = await this.helpRequestModel.findById(id);

      if (!helpRequest) {
        throw new NotFoundException('Help request not found');
      }

      if (helpRequest.userId.toString() !== userId) {
        throw new ForbiddenException(
          'You do not have permission to update this help request',
        );
      }

      const updatedHelpRequest = await this.helpRequestModel.findByIdAndUpdate(
        id,
        { $set: updateHelpRequestDto },
        { new: true },
      );

      return updatedHelpRequest;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error updating help request',
        details: error.message,
      });
    }
  }

  // Remove help request
  async remove(id: string, userId: string): Promise<void> {
    try {
      const helpRequest = await this.helpRequestModel.findById(id);

      if (!helpRequest) {
        throw new NotFoundException('Help request not found');
      }

      if (helpRequest.userId.toString() !== userId) {
        throw new ForbiddenException(
          'You do not have permission to delete this help request',
        );
      }

      await this.helpRequestModel.findByIdAndDelete(id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error deleting help request',
        details: error.message,
      });
    }
  }

  // Get help requests by user ID
  async findByUserId(userId: string): Promise<HelpRequest[]> {
    try {
      const helpRequests = await this.helpRequestModel
        .find({ userId })
        .populate('userId', '_id')
        .sort({ createdAt: -1 })
        .exec();

      if (!helpRequests || helpRequests.length === 0) {
        throw new NotFoundException('No help requests found for this user');
      }

      return helpRequests;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotAcceptableException({
        error: 'Error fetching help requests',
        details: error.message,
      });
    }
  }
}
