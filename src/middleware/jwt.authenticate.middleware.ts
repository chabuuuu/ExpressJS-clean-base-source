import { ErrorCode } from '@/enums/ErrorCode.enum';
import BaseException from '@/utils/exception/BaseException';
import { StatusCodes } from 'http-status-codes';

import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function authenticateJWT(req: any, res: any, next: any) {
  try {
    let token: string = req.header('Authorization');
    if (!token) {
      throw new BaseException(ErrorCode.AUTH_01, 'Authorization header is required', StatusCodes.UNAUTHORIZED);
    }
    if (token != null) {
      token = token.split('Bearer ')[1];
    }

    await jwt.verify(token, JWT_SECRET, async (err: any, user: any) => {
      if (err) {
        console.log('token error: ', err);
        throw new BaseException(ErrorCode.AUTH_02, 'Invalid token. You need to login first', StatusCodes.UNAUTHORIZED);
      }
      req.user = user;
      next();
    });
  } catch (error: any) {
    next(error);
  }
}
