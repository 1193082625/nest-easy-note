import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Space } from 'src/spaces/schemas/space.schema';
import { Tag } from 'src/tags/schemas/tag.schema';

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  intro: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: Date, default: Date.now })
  create_at: Date;

  @Prop({ type: Date, default: Date.now })
  update_at: Date;

  @Prop({ required: false })
  space_id: string;

  user: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }] })
  tags: Tag[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Space' }] })
  spaces: Space[];
}

export type NoteDocument = Note & Document;

export const NoteSchema = SchemaFactory.createForClass(Note);

NoteSchema.plugin(mongoosePaginate);
