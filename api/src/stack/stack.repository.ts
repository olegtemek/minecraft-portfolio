import { Injectable } from '@nestjs/common';

import { Prisma, Stack } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StackRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Stack[]> {
    return this.prisma.stack.findMany();
  }

  async findById(id: number): Promise<Stack | null> {
    return this.prisma.stack.findUnique({ where: { id } });
  }

  async createStack(data: Prisma.StackCreateInput): Promise<Stack> {
    return this.prisma.stack.create({ data });
  }

  async updateStack(
    id: number,
    data: Prisma.StackUpdateInput,
  ): Promise<Stack | null> {
    return this.prisma.stack.update({ where: { id }, data });
  }

  async deleteStack(id: number): Promise<Stack | null> {
    return this.prisma.stack.delete({ where: { id } });
  }
}
