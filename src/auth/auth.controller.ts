import { Controller,Post, Body, Patch} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() user: CreateAuthDto) {
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Login route for Mobile Team' })
  @Post('login-mobile')
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  loginMobile(@Body() user: CreateAuthDto) {
    return this.authService.loginMobile(user);
  }

  @ApiOperation({ summary: 'Reset password with new one' })
  @Patch('/reset-password')
  @ApiResponse({ status: 200, description: 'Account successfully reset' })
  @ApiResponse({ status: 422, description: 'This action can not be done' })
  resetPassword(@Body() resetPasswordDto: CreateAuthDto) {
     return this.authService.resetPassword(resetPasswordDto);
  }
  
}
