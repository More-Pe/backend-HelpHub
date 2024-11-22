import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { Model } from 'mongoose';
import { Rating, RatingDocument } from './entities/rating.schema';
import { InjectModel } from '@nestjs/mongoose';
import { format } from 'date-fns';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
  ) {}
  //create a new review
  async createReview(createRatingDto: CreateRatingDto) {
    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    try {
      const revieweCreate = await this.ratingModel.create({
        ...createRatingDto, date:formattedDate
        
      });

      return revieweCreate;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new NotAcceptableException({
        error: 'Error creating review',
        details: error.message,
      });
    }
  }
//find all reviews of one user by id_user
  async findAllByUser(id:string) {
    try {
      const ratings = await this.ratingModel.find({ id_usrrv: id });
      if (ratings.length == 0) {
        throw new NotFoundException({
        })
      }
      else
        return ratings;

    } catch (error) {
      throw new NotFoundException({

        error: 'No ratings added!',
      })
    }
  }

  
}
