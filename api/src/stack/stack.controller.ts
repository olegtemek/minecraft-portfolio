import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StackService } from './stack.service';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { JwtAuthGuard } from 'src/user/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FormDataRequest } from 'nestjs-form-data';

@ApiTags('Stack')
@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    type: CreateStackDto,
    description: 'For create stack item',
  })
  create(@Body() createStackDto: CreateStackDto) {
    return this.stackService.create(createStackDto);
  }

  @Get()
  @ApiBody({
    description: 'for get all stack',
  })
  findAll() {
    return this.stackService.findAll();
  }

  @Get(':id')
  @ApiBody({
    description: 'For get stack by id',
  })
  findOne(@Param('id') id: string) {
    return this.stackService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateStackDto,
    description: 'Update stack',
  })
  update(@Param('id') id: string, @Body() updateStackDto: UpdateStackDto) {
    return this.stackService.update(+id, updateStackDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Delete stack',
  })
  remove(@Param('id') id: string) {
    return this.stackService.remove(+id);
  }
}
