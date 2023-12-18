import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Schema()
export class Space {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Date, default: Date.now })
  create_at: Date;

  @Prop({ type: Date, default: Date.now })
  update_at: Date;

  user: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
}

export type SpaceDocument = Space & Document;

export const SpaceSchema = SchemaFactory.createForClass(Space);

SpaceSchema.plugin(mongoosePaginate);
