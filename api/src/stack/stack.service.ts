import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStackDto } from './dto/create-stack.dto';
import { UpdateStackDto } from './dto/update-stack.dto';
import { StackRepository } from './stack.repository';
import { FileService } from 'src/file/file.service';
import { FileResponse } from 'src/file/file-response';
import { PAGE_NOT_FOUND } from 'src/error.lang';

@Injectable()
export class StackService {
  constructor(
    private readonly stackRepository: StackRepository,
    private readonly fileService: FileService,
  ) {}
  async create(createStackDto: CreateStackDto) {
    let image: FileResponse = await this.fileService.saveFile(
      createStackDto.image,
    );

    const stack = await this.stackRepository.createStack({
      title: createStackDto.title,
      image: image?.url,
    });

    return {
      message: 'Stack was created',
    };
  }

  async findAll() {
    const stacks = await this.stackRepository.findAll();
    return { stacks };
  }

  async findOne(id: number) {
    const stack = await this.stackRepository.findById(id);
    if (!stack) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
    return {
      stack,
    };
  }

  async update(id: number, updateStackDto: UpdateStackDto) {
    const stack = await this.stackRepository.findById(id);
    if (!stack) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
    let image: FileResponse = await this.fileService.saveFile(
      updateStackDto.image,
    );

    const updateStack = await this.stackRepository.updateStack(id, {
      title: updateStackDto.title,
      image: image?.url,
    });

    return {
      message: 'Stack was updated',
    };
  }

  async remove(id: number) {
    const stack = await this.stackRepository.findById(id);
    if (!stack) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    await this.stackRepository.deleteStack(id);
    return {
      message: 'Stack was deleted',
    };
  }
}
