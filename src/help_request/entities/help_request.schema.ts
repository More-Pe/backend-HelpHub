import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import { Document, HydratedDocument, Types } from 'mongoose';

export type HelpRequestDocument = HydratedDocument<HelpRequest>;

@Schema()
export class HelpRequest extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @IsString()
  @Prop({ required: true })
  title: string;

  @IsString()
  @Prop({ required: true })
  description: string;

  @IsString()
  @Prop()
  category: string;

  @Prop()
  profilePicture: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const HelpRequestSchema = SchemaFactory.createForClass(HelpRequest);
