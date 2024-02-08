import { Expose, Transform } from 'class-transformer';

export class ItemsDto {
  @Expose()
  @Transform(params => params.obj?._id.toString())
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: boolean;

  @Expose()
  price: number;
}
