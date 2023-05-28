import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectRepository } from './project.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository, JwtService],
})
export class ProjectModule {}
