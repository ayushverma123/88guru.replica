import {
    IsNumber,
    IsDateString,
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
    IsBoolean,
  } from 'class-validator';
  
  export class CreateUserDto {
  
    @IsNotEmpty()
    firstname: string;
  
    @IsNotEmpty()
    @IsString()
    lastname: string;
  
    @IsNotEmpty()
    @IsNotEmpty()
    @IsEmail()
    emailid: string;
  
    @IsNotEmpty()
    @IsMobilePhone('en-IN')
    mobile: string;

    @IsBoolean()
    isactive: boolean;
  
    @IsNotEmpty()
    // @IsStrongPassword()
    password: string;

    @IsNumber() 
    id: number;

    @IsString()
    countrycode: string;
   

  }
  