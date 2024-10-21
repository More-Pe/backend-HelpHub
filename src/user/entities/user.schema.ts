import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';


export type UserDocument = HydratedDocument<User>;
@Schema()
export class User extends Document{

  @Prop()
  @IsEmail()
  email: string;
   
  @IsString()
  @Prop()
  password: string;

  @IsString()
  @Prop()
  nameUser: string;

  @IsString()
  @Prop()
  surnameUser: string;

  @Prop()
  phone: string;

  @Prop()
  optionCall: boolean;

  @Prop()
  showPhone: boolean;

  @Prop()
  blocked: boolean = false;

  @Prop()
  role: string;

}
export const UserSchema = SchemaFactory.createForClass(User);
