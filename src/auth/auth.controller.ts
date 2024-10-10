import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() user: CreateAuthDto) {
    return this.authService.login(user);
  }

  @Patch('/reset-password')
  resetPassword(@Body() resetPasswordDto: CreateAuthDto) {
     return this.authService.resetPassword(resetPasswordDto);
  }
  
}
