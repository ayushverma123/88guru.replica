import { PrismaService } from 'libs/database/prisma.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'libs/repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    JwtService,
    UserRepository,
    UserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
