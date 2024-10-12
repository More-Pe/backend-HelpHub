import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { Document, HydratedDocument, Types } from 'mongoose';
import { User } from 'src/user/entities/user.schema';

export enum TimeRange {
  MORNING = '08:00hs a 14:00hs',
  AFTERNOON = '15:00hs a 17:00hs',
  EVENING = '17:00hs a 21:00hs',
  FULL_DAY = '08:00hs a 21:00hs',
  FLEXIBLE = 'Flexible schedule',
}

export enum DaysOfWeek {
  MONDAY = 'Lunes',
  TUESDAY = 'Martes',
  WEDNESDAY = 'Miércoles',
  THURSDAY = 'Jueves',
  FRIDAY = 'Viernes',
  SATURDAY = 'Sábado',
  SUNDAY = 'Domingo',
}

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  
  @IsString()
  @Prop()
  description: string;
  
  @Prop()
  location: string; //Postal Code
  
  @Prop()
  profilePicture: string;
  
  @IsEnum(TimeRange)
  @Prop({ type: String, enum: TimeRange, required: true })
  preferredTimeRange: TimeRange;
  
  @IsArray()
  @IsEnum(DaysOfWeek, { each: true })
  @Prop({ type: [String], enum: DaysOfWeek })
  selectedDays: DaysOfWeek[];
  
//   @Prop({ type: [{ type: Types.ObjectId, ref: 'Hability' }] })
//   offeredHabilities: Hability[];

//   @Prop({ type: [{ type: Types.ObjectId, ref: 'Hability' }] })
//   interestedHabilities: Hability[];

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
