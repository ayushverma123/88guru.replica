import { Prisma } from "@prisma/client";
export class QueryDto {
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    pageNumber?: number;
    pageSize?: number;
    skip?: number;
    take?: number;
  }