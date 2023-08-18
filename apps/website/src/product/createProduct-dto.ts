import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateProductDto {
    @IsOptional()
    id: number;
  
    @IsNumber()
    categoryid: number;
  
    @IsString()
    title: string;
  
    @IsString()
    description: string;
  
    @IsNumber()
    @IsOptional()
    lastactivityby: number;
  
    @IsOptional()
    @IsString()
    lastactivityon: string;
  
    @IsOptional()
    @IsBoolean()
    ispublished: boolean;
  
  }
  