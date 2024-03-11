import { Expose, Transform } from 'class-transformer';

export class QueryDto {
  @Expose()
    sort: 'ASC' | 'DESC';

  @Expose()
  @Transform(({ value }) => parseInt(value, 10))
    page: number;

  @Expose()
  @Transform(({ value }) => parseInt(value, 10))
    limit: number;
}
