import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type HabilityDocument = HydratedDocument<Hability>;
@Schema()
export class Hability extends Document{

  @Prop()
  @IsString()
  title: string;
   
  @IsString()
  @Prop()
  level: string;

  @IsString()
  @Prop()
  mode: string;

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
