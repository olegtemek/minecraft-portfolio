import { BaseDto } from 'src/base.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto extends BaseDto {
  @ApiProperty()
  @IsString()
  login: string;
  @ApiProperty()
  @IsString()
  password: string;
}
