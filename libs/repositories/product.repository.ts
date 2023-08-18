import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'libs/database/prisma.service';
import { CreateProductDto } from 'apps/website/src/product/createProduct-dto';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(data) {
    return await this.prisma.products.create({ data: data });
  }

  async getbyid(id: number) {
    return await this.prisma.products.findFirst({ where: { id: id } });
  }

  async getbytitle(title: string) {
    return await this.prisma.products.findFirst({ where: { title } });
  }

  async update(id: number, data) {
    return await this.prisma.products.update({ where: { id: id }, data: data });
  }

  // async updateOneByCondition(where, data) {
  //   return await this.prisma.products.update({ where: where, data: data });
  // }

  async delete(id: number) {
    return await this.prisma.products.delete({ where: { id: id } });
  }
  async findByFilter(where, skip, take, orderBy) {
    return await this.prisma.products.findMany({
      where: where,
      include: {
        category: { select: { title: true,  } },
      },
      skip: skip,
      take: take,
      orderBy,
    });
  }
  async count(where) {
    return await this.prisma.products.count({ where: where });
  }


}


