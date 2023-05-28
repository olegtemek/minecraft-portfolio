import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { LoginUserDto } from './dto/login-user.dto';

import { JwtService } from '@nestjs/jwt';

import { PASSWORD_INCORRECT, USER_NOT_FOUND } from 'src/error.lang';
import { hash, verify } from 'argon2';
import { RefreshTokenDto } from './dto/refresh-user.dto';

import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly jwt: JwtService,
    private readonly userRepository: UserRepository,
  ) {}
  async login(loginUserDto: LoginUserDto) {
    let { login, password } = loginUserDto;
    const user = await this.userRepository.findByLogin(login);

    if (!user) throw new BadRequestException(USER_NOT_FOUND);

    const match: boolean = await verify(user.password, password);

    if (!match) throw new BadRequestException(PASSWORD_INCORRECT);

    const tokens: ITokens = await this.generateTokens(user.id);

    delete user.password;
    return {
      user: user,
      ...tokens,
    };
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    let verifyUser: User = await this.jwt.verifyAsync(refreshTokenDto.token);
    if (!verifyUser) throw new UnauthorizedException(USER_NOT_FOUND);

    const user = await this.userRepository.findById(verifyUser.id);

    delete user.password;

    let tokens: ITokens = await this.generateTokens(user.id);

    return {
      user: user,
      ...tokens,
    };
  }

  private async generateTokens(userId: number): Promise<ITokens> {
    const data = { id: userId };
    const accessToken = this.jwt.sign(data, {
      expiresIn: '1d',
    });
    const refreshToken = this.jwt.sign(data, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }
}
