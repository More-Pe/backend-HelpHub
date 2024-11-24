import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { HydratedDocument, Document } from 'mongoose';
import { Skills } from '../../profile/entities/profile.schema';

export type RatingDocument = HydratedDocument<Rating>;

@Schema()
export class Rating extends Document {
  @Prop()
  @IsString()
  id_usrev: string; //who emit a mark for another user

  @Prop()
  @IsString()
  id_usrrv: string; //who recieve a mark for another user

  @Prop()
  @IsNumber()
  stars: number;

  @Prop()
  @IsString()
  description: string;

  @Prop()
  @IsString()
  category: Skills;

  @Prop()
  @IsString()
  @IsDate()
  date: string;
}
export const RatingSchema = SchemaFactory.createForClass(Rating);
