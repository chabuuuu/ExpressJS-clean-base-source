import { getReasonPhrase, ReasonPhrases, StatusCodes } from "http-status-codes";

class BaseException extends Error {
    public httpStatusCode: number;
    public httpStatusMessage: string;
    public code: string;
    public message: string;

    /**
     * Generate a new instance of BaseException
     * @param code
     * @param message 
     * @param httpStatusCode 
     */
    constructor(code: string, message: string, httpStatusCode: number) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        
        this.httpStatusCode = httpStatusCode;
        this.httpStatusMessage = getReasonPhrase(httpStatusCode) || ReasonPhrases.INTERNAL_SERVER_ERROR;
        this.code = code;
        this.message = message;
        Error.captureStackTrace(this);
    }
}
export default BaseException;
