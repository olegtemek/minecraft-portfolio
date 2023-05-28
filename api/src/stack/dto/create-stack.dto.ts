import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { BaseDto } from 'src/base.dto';

export class CreateStackDto extends BaseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({
    type: 'file',
    description: 'image like a file jpeg/png',
    required: true,
  })
  @IsFile()
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  image: MemoryStoredFile;
}
