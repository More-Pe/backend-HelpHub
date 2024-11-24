import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsString } from 'class-validator';
import { HydratedDocument, Document } from 'mongoose';

export type ChateDocument = HydratedDocument<Chat>;
@Schema()
export class Chat extends Document {
  @Prop()
  @IsString()
  from: string;

  @Prop()
  @IsString()
  to: string;

  @Prop()
  @IsString()
  message: string;

  @Prop()
  @IsString()
  @IsDate()
  timestamp: string;
}
export const ChatSchema = SchemaFactory.createForClass(Chat);
