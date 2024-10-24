import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EmailServiceModule } from './email_service/email_service.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { HabilityModule } from './hability/hability.module';
import { UploadServiceModule } from './upload-service/upload-service.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),MongooseModule.forRoot(process.env.IP_DATABASE), UserModule, EmailServiceModule, AuthModule,ProfileModule,HabilityModule, UploadServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
