import { Injectable } from '@nestjs/common';

import { Prisma, Project } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    return this.prisma.project.findMany();
  }

  async findById(id: number): Promise<Project | null> {
    return this.prisma.project.findUnique({ where: { id } });
  }
  async findBySlug(slug: string): Promise<Project | null> {
    return this.prisma.project.findFirst({ where: { slug } });
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async updateProject(
    id: number,
    data: Prisma.ProjectUpdateInput,
  ): Promise<Project | null> {
    return this.prisma.project.update({ where: { id }, data });
  }

  async deleteProject(id: number): Promise<Project | null> {
    return this.prisma.project.delete({ where: { id } });
  }
}
