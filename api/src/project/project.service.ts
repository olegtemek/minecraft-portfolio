import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './project.repository';
import { PAGE_NOT_FOUND, TITLE_IS_BUSY } from 'src/error.lang';
import slugify from 'slugify';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  async create(createProjectDto: CreateProjectDto) {
    createProjectDto.slug = slugify(createProjectDto.title);
    try {
      const project = await this.projectRepository.createProject(
        createProjectDto,
      );

      return {
        message: 'Project was created',
      };
    } catch (e) {
      throw new BadRequestException(TITLE_IS_BUSY);
    }
  }

  async findAll() {
    const projects = await this.projectRepository.findAll();
    return {
      projects,
    };
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    return {
      project,
    };
  }
  async findOneBySlug(slug: string) {
    const project = await this.projectRepository.findBySlug(slug);
    if (!project) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    return {
      project,
    };
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    updateProjectDto.slug = slugify(updateProjectDto.title);
    try {
      const createdProject = await this.projectRepository.updateProject(
        id,
        updateProjectDto,
      );
      return {
        message: 'Project was updated',
      };
    } catch (e) {
      throw new BadRequestException(TITLE_IS_BUSY);
    }
  }

  async remove(id: number) {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }
    await this.projectRepository.deleteProject(id);
    return {
      message: 'Project was delete',
    };
  }
}
