import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from 'src/user/entities/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt';
import { EmailServiceModule } from 'src/email_service/email_service.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ //Method to identify via JWT
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ ConfigModule ], 
      inject: [ ConfigService ], //inject ConfigService
      useFactory: ( configService: ConfigService ) => { 
        return{
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '1h',
          }
        }
      }}),
    EmailServiceModule,
    //UserModule,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [
    
    AuthService
  ],
})
export class AuthModule {}
