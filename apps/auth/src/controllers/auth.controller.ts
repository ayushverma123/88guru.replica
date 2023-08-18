import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../models/login.dto';
import { ForgetPasswordDto } from '../models/forget-password.dto';
import { ResetPasswordDto } from '../models/reset-password.dto';
import { JwtGuard } from 'libs/guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() data: LoginDto) {
    return await this.authService.logIn(data);
  }  

  @Get('/getlogininfo')
  @UseGuards(JwtGuard)
  async getLoginInfo(@Req() req: any) {
    const id = req.user.id;
    const user = await this.authService.getbyid(id);
    return { user: user };
  }
}
