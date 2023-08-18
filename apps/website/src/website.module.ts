import { Module } from '@nestjs/common';  
import { CategoryController } from './category/category.controller';
import { ProductController } from './product/product.controller';
import { productService } from './product/product.service';
import { CategoryService } from './category/category.service';
import { CategoryRepository } from 'libs/repositories/category.repository';
import { PrismaService } from 'libs/database/prisma.service';
import { ProductRepository } from 'libs/repositories/product.repository';


@Module({
  imports: [ ],
  controllers: [ CategoryController, ProductController],
  providers: [ productService, CategoryService, CategoryRepository, PrismaService, ProductRepository],
})
export class WebsiteModule {}
