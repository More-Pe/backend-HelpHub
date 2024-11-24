import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsString } from 'class-validator';
import { HydratedDocument, Document } from 'mongoose';

export type ExchangeDocument = HydratedDocument<Exchange>;
@Schema()
export class Exchange extends Document {
  @Prop()
  @IsString()
  transmitter: string;

  @Prop()
  @IsString()
  reciever: string;

  @Prop()
  @IsString()
  state: string;

  @Prop()
  @IsString()
  @IsDate()
  date: string;
}
export const ExchangeSchema = SchemaFactory.createForClass(Exchange);
