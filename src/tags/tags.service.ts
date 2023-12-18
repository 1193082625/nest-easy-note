import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private TagModel: Model<TagDocument>) {}

  async findAll(): Promise<Tag[]> {
    return this.TagModel.find().exec();
  }
}
