import { Expose, Transform } from 'class-transformer';

export class ChatStateDTO {
  @Expose()
  @Transform(params => params.obj?._id.toString())
  id: string;

  @Expose()
  userId: string;

  @Expose()
  state: string;

  @Expose()
  targetWord: string;

  @Expose()
  incorrectTry: number;

  @Expose()
  isEnToGeo: boolean;
}
