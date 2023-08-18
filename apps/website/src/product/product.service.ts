import { ResponseInterface } from 'libs/repositories/response-interface';
import { ProductRepository } from 'libs/repositories/product.repository';
import { Injectable, NotFoundException } from '@nestjs/common';   
import { QueryDto } from './query-dto';

@Injectable()
export class productService {
  constructor(private product: ProductRepository) {}

  
  async create(data) {
    return await this.product.create({ data: data });
  }
  
  async getall(query: QueryDto) {
    console.log(query);
    const value = new ResponseInterface(query);
    let filter = { isactive: true, ispublished: true };
  
    ///---------------------------where-------------------------------------------
    const where = {
      OR: [
        { title: { contains: value.search, mode: 'insensitive' } },
        { description: { contains: value.search, mode: 'insensitive' } },
        {
          category: { title: { contains: value.search, mode: 'insensitive' } },
        },
      ],
      AND: {
        ...filter,
      },
    };

    const totalNoOfItem = await this.product.count(filter);
    const data = await this.product.findByFilter(
      where,
      value.skip,
      value.resPerPage,
      value.orderBy,
    );

    return value.response(
      totalNoOfItem,
      200,
      '',
      'success',
      data,
      query.orderby,
      query.ordertype,
    );
  }



  
}
