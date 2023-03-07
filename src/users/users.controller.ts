import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    return this.usersService.login(createUserDto);
  }

  //@Patch(':id')
  //update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
  //  return this.usersService.update(id, updateUserDto);
 // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }

  @Get()
  findAll(){
    return this.usersService.findAll()
  }
}