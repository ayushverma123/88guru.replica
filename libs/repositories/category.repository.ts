import { QueryDto } from 'libs/models/query-dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from 'apps/website/src/category/createCategory-dto';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.categories.create({ data: data });
  }
  // async getAll() {
  //   return await this.prisma.categories.findMany({});
  // }

  async getbyid(id: number) {
    return await this.prisma.categories.findFirst({ where: { id: id } });
  }

  async getselectlist() {
    const data = await this.prisma.categories.findMany({
      where: { isactive: true },
    });

    return data;
  }


  async getForFilters(queryDto: QueryDto) {

    const { search} = queryDto;
    let query = this.prisma.categories.findMany({
      where: ({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
        ],
      }),
    })

    return query;
  }



  async getbytitle(title: string) {
    return await this.prisma.categories.findFirst({ where: { title } });
  }

  async update(id: number, data) {
    return await this.prisma.categories.update({
      where: { id: id },
      data: data,
    });
  }

  // async updateOneByCondition(where, data) {
  //   return await this.prisma.categories.update({ where: where, data: data });
  // }

  async delete(id: number) {
    return await this.prisma.categories.delete({ where: { id: id } });
  }
  async findByFilter(where, skip, take, orderBy) {
    return await this.prisma.categories.findMany({
      where: where,
      skip: skip,
      take: take,
      orderBy,
    });
  }
  async count(where) {
    return await this.prisma.categories.count({ where: where });
  }
}
