import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Post('register')
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad request' }) 
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'List all exist users' })
  @Get('allUsers')
  @ApiResponse({ status: 200, description: 'OK' })
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Search one user by email' })
  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findOne(email);
  }

  @ApiOperation({ summary: 'Search one user by ID' })
  @Get('user-id/:id')
  findOneByIdUser(@Param('id') id: string) {
    return this.userService.findOneByIdUser(id);
  }

  @ApiOperation({ summary: 'Update some data by id_user' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
