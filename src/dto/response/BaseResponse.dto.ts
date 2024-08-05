import { ErrorResponseDTO } from '@/dto/response/ErrorResponse.dto';

export class BaseResponse<T> {
  public httpStatus: number;
  public httpMessage: string;
  public error: ErrorResponseDTO | null;
  public data: T;

  /**
   * DTO for global base response
   * @param httpStatus
   * @param httpMessage
   * @param error
   * @param data
   */
  constructor(httpStatus: number, httpMessage: string, error: ErrorResponseDTO | null, data: any) {
    this.httpStatus = httpStatus;
    this.httpMessage = httpMessage;
    this.error = error;
    this.data = data;
  }
}
