import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export enum Level {
  BASIC = 'basic',
  MEDIUM = 'medium',
  HIGH= 'high'
}
export enum Mode {
  ONLINE = 'online',
  PRESENTIAL = 'presential' 
}
export type HabilityDocument = HydratedDocument<Hability>;
@Schema()
export class Hability extends Document{

  @Prop()
  @IsString()
  title: string;
   
  @IsString()
  @IsEnum(Level, { each: true })
  @Prop({enum: Level, required: true })
  level: Level;

  @IsString()
  @IsEnum(Mode, { each: true })
  @Prop({enum: Mode, required: true })
  mode: Mode;

  @IsString()
  @Prop()
  description: string;

  @IsString()	
  @Prop()
  category: string;

  @IsString()	
  @Prop()
  user_id: string;


}
export const HabilitySchema = SchemaFactory.createForClass(Hability);
