import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailServiceService } from './email_service.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';

@Controller('email-service')
export class EmailServiceController {
  constructor(private readonly emailServiceService: EmailServiceService) {}

  @Post('emailAcount')
  emailAccount(@Body() emailAccount: CreateUserDto) {
    return this.emailServiceService.emailAccount(emailAccount);
  }

  @Post('loginEmail')
  loginEmail(@Body() loginEmail: LoginUserDto) {
    return this.emailServiceService.loginEmail(loginEmail);
  }

  @Post('resetEmail')
  resetEmail(@Body() resetEmail: LoginUserDto) {
    return this.emailServiceService.resetEmail(resetEmail);
  }

  
}
