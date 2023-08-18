import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IsStringOrArray } from 'libs/helpers/custome.validator';

export class QueryDto {

  @IsOptional()
  filter: Record<any, any>;

  @IsOptional()
  @IsString()
  orderby: string;

  @IsOptional()
  @IsString()
  ordertype: string;

  @IsOptional()
  @IsString()
  from: string;

  @IsOptional()
  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  pageIndex: number;

  @IsOptional()
  @IsString()
  pageSize: number;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsStringOrArray()
  organisation: string | string[];

  @IsOptional()
  @IsStringOrArray()
  category: string | string[];

  @IsOptional()
  @IsString()
  downloadxl: string;
}
