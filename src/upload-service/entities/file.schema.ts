import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsMongoId, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type FileDocument = HydratedDocument<Upload>;
@Schema()
export class Upload extends Document{
  @IsString()
  @Prop({ required: true })
  filename: string;

  @IsString()
  @Prop({ required: true })
  filepath: string;

  @IsString()
  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  size: number;

  @IsMongoId()
  @IsString()
  @Prop({ required: true })
  id_user:string;
}
export const FileSchema = SchemaFactory.createForClass(Upload);
