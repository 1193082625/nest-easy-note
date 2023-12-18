import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async findAll(): Promise<Note[]> {
    // 查询所有笔记，并填充关联的用户信息
    // return this.noteModel.find({ title: 1, intro: 1 }).populate('user').exec();
    return this.noteModel.find({}, { _id: 1, title: 1, intro: 1 }).exec();
  }

  async findOne(id: string): Promise<Note | null> {
    return this.noteModel.findById(id).exec();
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  async updateNote(noteId: string, updateData: Partial<Note>): Promise<Note> {
    try {
      const updatedNote = await this.noteModel.findByIdAndUpdate(
        noteId,
        { $set: updateData },
        { new: true },
      );

      if (!updatedNote) {
        throw new Error('Note not found');
      }

      return updatedNote;
    } catch (error) {
      throw new Error(`Error updating note: ${error.message}`);
    }
  }

  async updateByFilter(filter, updateData): Promise<Note | null> {
    try {
      const update = { $set: updateData };

      const result = await this.noteModel.updateOne(filter, update);

      if (result.modifiedCount === 0) {
        throw new Error('Note not found or not modified');
      }

      // 返回更新后的文档
      const updatedNote = await this.noteModel.findOne(filter);
      return updatedNote;
    } catch (error) {
      throw new Error(`Error updating note: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Note | null> {
    return this.noteModel.findByIdAndDelete(id).exec() as any;
  }
}
