import { BaseResponse } from "@/dto/response/BaseResponse.dto";
import { ErrorResponseDTO } from "@/dto/response/ErrorResponse.dto";
import BaseException from "@/utils/exception/BaseException";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

class ErrorResponseHandler {
    private httpStatus: number;
    private httpMessage: string;

    constructor() {
        /**
         * Default http status code
         */
        this.httpStatus = StatusCodes.INTERNAL_SERVER_ERROR;
        this.httpMessage = ReasonPhrases.INTERNAL_SERVER_ERROR;
    }

    public handle(error: any) : BaseResponse<any>{
        let handledError : ErrorResponseDTO
        handledError = this.handleSpecificError(error);
        return new BaseResponse(this.httpStatus, this.httpMessage, handledError, null);
    }

    public getHttpStatus() : number {
        return this.httpStatus;
    }

    /**
     ** Method to handle the specific error
     ** Modify this method to add more specific error handling
     * @param error 
     * @returns 
     */
    private handleSpecificError (error: any) : ErrorResponseDTO {

        //Error handling for Joi schema validate
        if (error.isJoi){            
            this.httpStatus = StatusCodes.BAD_REQUEST;
            this.httpMessage = ReasonPhrases.BAD_REQUEST;
            return new ErrorResponseDTO("VALIDATION_ERROR", error.message);
        }
        
        //Error handling for BaseException
        if (error instanceof BaseException)
            {                
                this.httpStatus = error.httpStatusCode;
                this.httpMessage = error.httpStatusMessage;
                return new ErrorResponseDTO(error.code, error.message); 
            }
        
        //Error handling for Error
        if (error instanceof Error)
            {
                return new ErrorResponseDTO("UNHANDLE_ERROR", error.message); 
            }

        
        //Default error handling
        return new ErrorResponseDTO("INTERNAL_SERVER_ERROR", "Internal Server Error");
    }
}

/**
 * Middleware to handle the error before sending it to the client
 * @param error 
 * @param req 
 * @param res 
 * @param next 
 */
export const globalErrorHanlder = (error: any, req: Request, res: Response, next: NextFunction) => {
    const errorHandler = new ErrorResponseHandler();
    
    //Handle the error
    const formatedResponse = errorHandler.handle(error);
    //Get the http status
    const httpStatus = errorHandler.getHttpStatus();

  res.status(httpStatus).json(formatedResponse);
};
