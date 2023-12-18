import { Controller, Get } from '@nestjs/common';
import { SpacesService } from './spaces.service';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spaceService: SpacesService) {}

  @Get()
  findAll() {
    return this.spaceService.findAll();
  }
}
