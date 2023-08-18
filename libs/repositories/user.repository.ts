import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma.service';
import { CreateUserDto } from 'libs/models/createUser-dto';

const select = {
  select: { emailid: true, id: true, createdat: true, modifiedat: true },
};

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.users.create({ data: data });
  }

  // async getAll(): Promise<
  //   { emailid: string; id: number; createdat: Date; modifiedat: Date }[]
  // > {
  //   return await this.prisma.users.findMany({
  //     ...select,
  //   });
  // }

  async getbyid(id: number): Promise<{
    firstname: string;
    lastname: string;
    mobile: string;
    emailid: string;
    id: number;
  }> {
    return await this.prisma.users.findFirst({
      where: { id: id },
    });
  }
  

  async getUserDetails(emailid: string) {
    return this.prisma.users.findFirst({where:{emailid}})
  }

  async update(
    id: number,
    data,
  ): Promise<{
    emailid: string;
    id: number;
    createdat: Date;
    modifiedat: Date;
  }> {
    return await this.prisma.users.update({
      data: data,
      where: { id: id },
      ...select,
    });
  }

  // async updateOneByCondition(
  //   where,
  //   data,
  // ): Promise<{
  //   emailid: string;
  //   id: number;
  //   createdat: Date;
  //   modifiedat: Date;
  // }> {
  //   return await this.prisma.users.update({
  //     data: data,
  //     where: where,
  //     ...select,
  //   });
  // }

  async delete(id: number): Promise<{
    emailid: string;
    id: number;
    createdat: Date;
    modifiedat: Date;
  }> {
    return await this.prisma.users.delete({ where: { id: id }, ...select });
  }
  

  async getbyemail(emailid: string): Promise<{
    emailid: string;
    id: number;
    password: string;
  }> {
    return await this.prisma.users.findFirst({
      where: { emailid },
    });
  }

  async findByFilter(where, skip, take, orderBy) {
    return await this.prisma.users.findMany({
      where: where,
      // include: {
      //   organisation: { select: { title: true } },
      //   category: { select: { title: true } },
      // },
      skip: skip,
      take: take,
      orderBy,
    });
  }
  async count(where) {
    return await this.prisma.users.count({ where: where });
  }

  
}
