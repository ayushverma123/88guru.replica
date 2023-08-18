import {
    ValidationOptions,
    ValidationArguments,
    registerDecorator,
  } from 'class-validator';
  
  export function IsStringOrArray(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
      registerDecorator({
        name: 'isStringOrArray',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            return typeof value === 'string' || Array.isArray(value);
          },
          defaultMessage(args: ValidationArguments) {
            return `${args.property} must be a string or an array`;
          },
        },
      });
    };
  }
  