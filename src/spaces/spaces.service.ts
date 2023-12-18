import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Space, SpaceDocument } from './schemas/space.schema';
import { Model } from 'mongoose';
import { CreateSpaceDto } from './dto/space.dto';

@Injectable()
export class SpacesService {
  constructor(
    @InjectModel(Space.name) private spaceModel: Model<SpaceDocument>,
  ) {}

  async findAll(): Promise<Space[]> {
    return this.spaceModel.find().exec();
  }

  async create(createSpaceDto: CreateSpaceDto): Promise<Space> {
    const createdSpace = new this.spaceModel(createSpaceDto);
    return createdSpace.save();
  }
}
