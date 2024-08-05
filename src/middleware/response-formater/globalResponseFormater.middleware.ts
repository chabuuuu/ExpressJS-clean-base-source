import { BaseResponse } from '@/dto/response/BaseResponse.dto';
import { ErrorResponseDTO } from '@/dto/response/ErrorResponse.dto';
import BaseException from '@/utils/exception/BaseException';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 ** Middleware to format the response before sending it to the client
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns
 */
export function globalResponseFormater(req: Request, res: Response, next: any) {
  const send = res.json;
  console.log('send', send);

  res.json = function (body: any): any {
    //Get the error
    const httpStatus = body.httpStatus || StatusCodes.INTERNAL_SERVER_ERROR;
    const httpMessage = body.httpMessage || 'Internal Server Error';
    const error = body.error || new ErrorResponseDTO('INTERNAL_SERVER_ERROR', 'Internal Server Error');

    //Get the response
    const data = body.data || null;
    const erorrResponse = data ? null : new ErrorResponseDTO(error.code, error.message);
    body = new BaseResponse(httpStatus, httpMessage, erorrResponse, data);

    //Set the HTTP status code
    res.status(httpStatus);

    //Send the response
    send.call(this, body);
  };

  next();
}
