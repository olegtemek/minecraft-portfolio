import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDto } from 'src/base.dto';

export class RefreshTokenDto extends BaseDto {
  @ApiProperty()
  @IsString()
  token: string;
}
