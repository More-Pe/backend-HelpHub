import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EmailServiceModule } from './email_service/email_service.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),MongooseModule.forRoot(process.env.IP_DATABASE), UserModule, EmailServiceModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
