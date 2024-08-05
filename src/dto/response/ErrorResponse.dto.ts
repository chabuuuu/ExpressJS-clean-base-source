export class ErrorResponseDTO {
  private code: string;
  private message: string;

  /**
   * DTO for error field in the response
   * @param code
   * @param message
   */
  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  public getCode(): string {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public setCode(code: string): void {
    this.code = code;
  }

  public setMessage(message: string): void {
    this.message = message;
  }
}
