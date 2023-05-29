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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from 'src/user/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Project')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiBody({
    type: CreateProjectDto,
    description: 'Create project',
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Get('project/:slug')
  @ApiOperation({ summary: 'Get project by slug' })
  @ApiParam({
    name: 'slug',
    type: 'string',
  })
  findOneBySlug(@Param('slug') slug: string) {
    return this.projectService.findOneBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiBody({
    type: UpdateProjectDto,
    description: 'Update project',
  })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth()
  @ApiBody({
    description: 'Delete project',
  })
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
