import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';  
 import { CreateUserDto } from 'libs/models/createUser-dto';
   
  
  @Controller('user')
  export class UserController {
    constructor(private service: UserService) {}
  
    @Post('/create')
    async create(@Body() data: CreateUserDto) {
      return await this.service.create(data);
    }
  
    @Post('/update')
    async update(@Body() data: CreateUserDto) {
      return await this.service.update(data);
    }
  
    @Delete('/delete/:id')
    async delete(@Param('id') id) {
      id = Number(id);
      return await this.service.delete(id);
    }
  }
  