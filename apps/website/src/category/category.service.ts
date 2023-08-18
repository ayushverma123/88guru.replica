import { Prisma } from '@prisma/client';
import { QueryDto } from 'libs/models/query-dto';
import { InternalServerErrorException } from '@nestjs/common';   
import { NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './createCategory-dto';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'libs/repositories/category.repository';


@Injectable()
export class CategoryService {
  constructor(private category: CategoryRepository) { }


  async created(data: CreateCategoryDto) {
    return await this.category.create(data)
  }


  async create(id: number, data: CreateCategoryDto) {
    // Check if an employee with the same ID already exists
    try {
      const existingCategory = await this.category.getbyid(id);

      if (existingCategory) {
        throw new NotFoundException('Category with the given ID already exists.');
      }

      // Continue with creating the employee if the ID is unique

      const createdcategory = await this.category.create(
        data);

      return {
        code: 201, // 201 indicates "Created" status
        message: 'Category created successfully',
        status: 'success',
        data: createdcategory,
      };
    } catch (error) {
      // Handle any errors that occur during the creation process
      throw new NotFoundException('Failed to create category.');
    }
  }

  async getselectlist() {
    const data = await this.category.getselectlist();

    return {
      code: 200,
      status: 'success',
      data: data,
    };
  }


  async delete(id: number) {
    const findCategory = await this.findCategory(id);
    const data = { isactive: false };
    const update = await this.category.update(id, data);
    if (!update) {
      throw new InternalServerErrorException('cant update');
    }

    return {
      code: 201,
      message: 'Category updated successfully',
      status: 'success',
      data: update,
    };

  }

  async update(id: number, data: CreateCategoryDto) {
    const findCategory = await this.category.getbyid(id);
    if (!findCategory) {
      throw new NotFoundException('Category not found')
    }
    const findCategoryTitle = await this.category.getbytitle(data.title);
    if (findCategoryTitle && findCategoryTitle.id != id) {
      throw new Error('Category already exist')
    }

    const update = await this.category.update(id, data);
    if (!update) {
      throw new Error('cant update')
    }

    return {
      code: 201,
      message: 'Category updated successfully',
      status: 'success',
      data: update,
    };
  }


  async findCategory(id: number) {
    const findCategory = await this.category.getbyid(id);
    if (!findCategory) {
      throw new NotFoundException('category not found');
    }
    return findCategory;
  }


  async getAllCategories(queryDto: QueryDto): Promise<any> {
    
    const { sortBy, sortOrder, pageNumber, pageSize, skip, take } = queryDto;

    let query = this.category.getForFilters(queryDto)

    const result = await query;

    // Apply sorting if provided
    if (sortBy && sortOrder) {
      result.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return bValue > aValue ? 1 : -1;
        }
      });
    }

    // Apply pagination if provided
    if (pageNumber && pageSize) {
      const calculatedSkip = (pageNumber - 1) * pageSize;
      return result.slice(calculatedSkip, calculatedSkip + pageSize);
    }

    // Apply skip and take directly from queryDto if provided
    if (skip !== undefined && take !== undefined) {
      return result.slice(skip, skip + take);
    }

    return result;
  }


}
