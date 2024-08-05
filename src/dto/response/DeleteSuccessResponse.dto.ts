import { Expose } from 'class-transformer';

export class UpdateSuccessResponseDto {
  @Expose()
  message!: string;
}
