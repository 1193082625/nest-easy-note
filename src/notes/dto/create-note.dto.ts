export class CreateNoteDto {
  readonly title: string;
  readonly intro: string;
  readonly content: string;
}

export class UpdateNoteDto {
  readonly _id: string;
  readonly noteData: CreateNoteDto;
}
