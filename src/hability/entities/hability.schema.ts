import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsString } from 'class-validator';
import { HydratedDocument, Document } from 'mongoose';
import { Skills } from '../../profile/entities/profile.schema';

export enum Level {
  BASIC = 'Básico',
  MEDIUM = 'Medio',
  HIGH = 'Avanzado',
}
export enum Mode {
  ONLINE = 'Online',
  PRESENTIAL = 'Presencial',
}
export type HabilityDocument = HydratedDocument<Hability>;
@Schema()
export class Hability extends Document {
  @Prop()
  @IsString()
  title: string;

  @IsString()
  @IsEnum(Level, { each: true })
  @Prop({ enum: Level, required: true })
  level: Level;

  @IsString()
  @IsEnum(Mode, { each: true })
  @Prop({ enum: Mode, required: true })
  mode: Mode;

  @IsString()
  @Prop()
  description: string;

  @IsString()
  @Prop()
  category: Skills[];

  @IsString()
  @Prop()
  user_id: string;
}
export const HabilitySchema = SchemaFactory.createForClass(Hability);
