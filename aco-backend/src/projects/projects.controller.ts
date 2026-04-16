import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getAll() {
    return this.projectsService.findAll();
  }

  @Get('mine')
  async getMine(@Request() req) {
    return this.projectsService.findByOwner(req.user.id);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Post()
  async create(@Request() req, @Body() body: any) {
    return this.projectsService.create({ ...body, ownerId: req.user.id });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.projectsService.update(id, body);
  }
}
