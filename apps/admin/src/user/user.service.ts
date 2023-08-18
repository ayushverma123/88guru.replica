import { hashPassword } from 'libs/helpers/password';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { UserRepository } from 'libs/repositories/user.repository';
  import { CreateUserDto } from 'libs/models/createUser-dto';
  
  @Injectable()
  export class UserService {
    constructor(
      private user: UserRepository,
    ) {}
  
    async create(data: CreateUserDto) {
      const finduser = await this.user.getbyemail(data.emailid);
  
      if (finduser ) {
        throw new BadRequestException('not found');
      }
      const hashedPassword = await hashPassword(data.password);
      const userData = {
        firstname: data.firstname,
        lastname: data.lastname,
        emailid: data.emailid,
        mobile: data.mobile,
        password: hashedPassword,
        id:data.id,
      };
  
      const create = await this.user.create(userData);
      if (!create) throw new InternalServerErrorException('cant update');
  
  
      return {
        code: 201,
        message: 'User created successfully',
        status: 'success',
        data: create,
      };
    }

  
    async update(data: CreateUserDto) {
      const find = await this.user.getbyid(data.id);
      if (!find) throw new NotFoundException('Not found');
  
      if (data.emailid) {
        const finduser = await this.user.getbyemail(data.emailid);
        if (finduser) {
          throw new BadRequestException('Not found')
        }
      }
  
      const updateData = {
        firstname: data.firstname,
        emailid: data.emailid,
        lastname: data.lastname,
        mobile: data.mobile,
      };
  
      const update = this.user.update(data.id, updateData);
  
      return {
        code: 201,
        message: 'User updated successfully',
        status: 'success',
        data: update,
      };
    }
  
    /////////////////////////////////////////////////////////////////////////////////////////////
  
    /////////////////////////////////////////////////DELETE/////////////////////////////////////////////////////
  
    async delete(id: number) {
      const find = await this.user.getbyid(id);
  
      if (!find) throw new NotFoundException('not found')
  
      const done = await this.user.update(id, { isactive: false });
  
      if (!done)
        throw new InternalServerErrorException('something went wrong');
      return {
        code: 201,
        message: 'User created successfully',
        status: 'success',
        data: done,
      };
    }
  }
  