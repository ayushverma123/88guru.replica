import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';  
import { QueryDto } from './query-dto';
import { productService } from './product.service';

@Controller('website')
export class ProductController {
  constructor(private service: productService) {}

  @Get('/getall/:orgcode')
  async getall(@Param('orgcode') orgcode: string, @Query() query: QueryDto) {
    query.organisation = orgcode;
    const data = await this.service.getall(query);
    return data;
  }
}
