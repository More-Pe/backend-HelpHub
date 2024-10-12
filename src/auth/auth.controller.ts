import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() user: CreateAuthDto) {
    return this.authService.login(user);
  }

  @Patch('/reset-password')
  @ApiResponse({ status: 200, description: 'Account successfully reset' })
  @ApiResponse({ status: 422, description: 'This action can not be done' })
  resetPassword(@Body() resetPasswordDto: CreateAuthDto) {
     return this.authService.resetPassword(resetPasswordDto);
  }
  
}
