import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';

import { RefreshTokenDto } from './dto/refresh-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBody({
    type: LoginUserDto,
    description: 'For login user, to get refreshToken and accessToken.',
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @Post('refresh')
  @ApiBody({ type: RefreshTokenDto, description: 'For update access token' })
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.userService.refresh(refreshTokenDto);
  }
}
