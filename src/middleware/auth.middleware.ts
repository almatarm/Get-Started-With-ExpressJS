import { Request, NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../auth/dataStoredInToken';
import RequestWithUser from '../auth/request.with.user';
import userModel from '../users/user.model';
import AuthConfig from '../config/auth.config';

function getTokenFromHeader(request: Request) {
  if (request.headers.authorization  && request.headers.authorization.split(' ')[0] === 'Token' ||
    request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
    return request.headers.authorization.split(' ')[1];
  }
  return null;
}

async function authMiddleware(request: RequestWithUser, response: Response, 
  next: NextFunction): Promise<void> {
  const token = getTokenFromHeader(request);
  if (token) {
    const secret = AuthConfig.jwtAccessKey;
    try {
      const verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
