import { comparePasswords } from 'libs/helpers/password';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'libs/repositories/user.repository';
import { JWT_CONSTANT } from 'libs/constants/constants';
import { hashPassword } from 'libs/helpers/password';
import { LoginDto } from '../models/login.dto';
import { ForgetPasswordDto } from '../models/forget-password.dto';
import { ResetPasswordDto } from '../models/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private user: UserRepository,
    private jwtService: JwtService,
  ) {}

  //////////////////////////////////////////////////////////////LOG IN///////////////////////////////////////////////////////////////

  async logIn(data: LoginDto) {
    let findUser = await this.user.getUserDetails(data.emailid);
    if (!findUser) {
      throw new NotFoundException('Invalid username password.');
    }

    const isMached = await comparePasswords(data.password, findUser.password);
    if (!isMached) {
      throw new NotFoundException('Invalid username password.');
    }

    const token = await this.jwtToken(findUser.id);

    return {
      code: '200',
      message: '',
      status: 'success',
      data: { access_token: token.access_token },
    };
  }

  ///////////////////////////////////////////////////////////////////FORGET PASSWORD////////////////////////////////////////////////
  


  async getbyid(id) {
    console.log('id', id);
    const findUser = await this.user.getbyid(id);
    if (!findUser) {
      throw new UnauthorizedException('User not found!');
    }

    return findUser;
  }

  ////////////////////////////////////////////////////////////////////////////////

  async jwtToken(id) {
    const payload = { id: id, };
    return {
      access_token: await this.jwtService.sign(payload, {
        privateKey: JWT_CONSTANT,
        expiresIn: '7d',
      }),
    };
  }
}
