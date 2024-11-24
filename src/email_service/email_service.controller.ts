import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailServiceService } from './email_service.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('email-service')
export class EmailServiceController {
  constructor(private readonly emailServiceService: EmailServiceService) {}

  @Post('emailAcount')
  @ApiOperation({ summary: 'Send register 2FA email' })
  emailAccount(@Body() emailAccount: CreateUserDto) {
    return this.emailServiceService.emailAccount(emailAccount);
  }

  @ApiOperation({ summary: 'Send login 2FA email' })
  @Post('loginEmail')
  loginEmail(@Body() loginEmail: LoginUserDto) {
    return this.emailServiceService.loginEmail(loginEmail);
  }

  @ApiOperation({ summary: 'Send 2FA email for reset password' })
  @Post('resetEmail')
  resetEmail(@Body() resetEmail: LoginUserDto) {
    return this.emailServiceService.resetEmail(resetEmail);
  }

  
}
