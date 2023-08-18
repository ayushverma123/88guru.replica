import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserRepository } from 'libs/repositories/user.repository';
import { PrismaService } from 'libs/database/prisma.service';

import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    UserRepository,
    JwtService
  ],
})
export class AuthModule {}
