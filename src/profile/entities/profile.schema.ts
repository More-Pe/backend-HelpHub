import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { Document, HydratedDocument, Types } from 'mongoose';

export enum TimeRange {
  MORNING = '08:00 a 14:00',
  AFTERNOON = '15:00 a 17:00',
  EVENING = '17:00 a 21:00',
  FULL_DAY = '08:00 a 17:00',
  FLEXIBLE = 'Horario flexible',
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

export enum Skills {
  ANIMAL = 'Animales',
  HELP = 'Ayuda',
  CONSULT = 'Consultoría',
  DESIGN = 'Diseño',
  LENGUAGE = 'Idiomas',
  IT = 'Informática',
  REP = 'Reparaciones',
  HEALTH = 'Salud',
  TUT = 'Tutorías',
  OTHER = 'Otros'
}


export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @IsString()
  @Prop({ required: true })
  description: string;

  @IsArray()
  @IsString({ each: true })
  @Prop({ type: [String], required: true })
  interestedSkills: Skills[];

  @Prop({ required: true })
  location: string; //Postal Code

  @Prop()
  profilePicture: string;

  @IsEnum(TimeRange)
  @Prop({ type: String, enum: TimeRange, required: true })
  preferredTimeRange: TimeRange;

  @IsArray()
  @IsEnum(DaysOfWeek, { each: true })
  @Prop({ type: [String], enum: DaysOfWeek, required: true })
  selectedDays: DaysOfWeek[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
