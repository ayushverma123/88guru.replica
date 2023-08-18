import { CategoryService } from './category.service';
import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { CreateCategoryDto } from './createCategory-dto';

@Controller('website')
export class CategoryController {
  constructor(private service: CategoryService) { }


  @Get('/category/getall')
  async getselectlist() {
    return await this.service.getselectlist();
  }

  @Post('/category/create')
  async createEmployee(@Body() data: CreateCategoryDto) {
    return this.service.created(data);
  }

  @Put('/category/updatebyid/:id')
  async update(@Param('id') id, @Body() data: CreateCategoryDto) {
    id = Number(id);
    return await this.service.update(id, data);
  }
 

  @Get('/category/getall')
  async getQuery(@Query() QueryDto) {
    return await this.service.getAllCategories(QueryDto)
  }

  @Delete('/category/deletebyid/:id')
  async delete(@Param('id') id, @Body() data: CreateCategoryDto) {
    id = Number(id);
    return await this.service.update(id, data);
  }

}  
