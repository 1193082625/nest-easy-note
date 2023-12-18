import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema()
export class Tag {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  create_at: Date;

  @Prop({ type: Date, default: Date.now })
  update_at: Date;

  user: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
}

export type TagDocument = Tag & Document;

export const TagSchema = SchemaFactory.createForClass(Tag);

TagSchema.plugin(mongoosePaginate);
