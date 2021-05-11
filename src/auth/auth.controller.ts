import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import Users from '../users/user.model';
import RegisterDTO from './register.dto';
import UnableToHandleRequestException from '../exceptions/UnableToHandleRequestException';
import UserAlreadyExistsException from '../exceptions/UserAlreadyExistsException';
import LogInDTO from './logIn.dto';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import User from 'users/user';
import Token from './token';
import AuthConfig from '../config/auth.config';
import DataStoredInToken from './dataStoredInToken';

class AuthController {

  public register = async (request: Request, response: Response,
    next: NextFunction): Promise<void> => {
    try {
      const data: RegisterDTO = request.body;
      const existingUser = await Users.findOne({ username: data.username });
      if (existingUser) {
        next(new UserAlreadyExistsException(data.username));
      } else {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await Users.create({ ...data, password: hashedPassword });
        newUser.password = undefined;
        const token = this.generateAccessToken(newUser);
        response.setHeader('Set-Cookie', [this.createCookie(token)]);
        response.status(200).send({ token, user: newUser });
      }
    } catch (error) {
      next(new UnableToHandleRequestException(error.message));
    }
  }

  public loggingIn = async (request: Request, response: Response,
    next: NextFunction): Promise<void> => {
    const logInData: LogInDTO = request.body;
    try {
      const user = await Users.findOne({ username: logInData.username });
      if (user) {
        const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
        if (isPasswordMatching) {
          user.password = undefined;
          const accessToken = this.generateAccessToken(user);
          const refreshToken = this.generateRefreshToken(user);
          response.setHeader('Set-Cookie', [this.createCookie(accessToken)]);
          response.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // would expire after 1month
            httpOnly: true,
            signed: true
          });
          response.status(200).send({ user, "token": accessToken, refreshToken });
          return;
        }
      }
      next(new WrongCredentialsException());
    } catch (error) {
      next(new UnableToHandleRequestException(error.message));
    }
  }

  public loggingOut = (request: Request, response: Response): void => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  }

  private generateAccessToken(user: User): Token {
    const secret = AuthConfig.jwtAccessKey;
    const expiresIn = AuthConfig.jwtAccessExpiresIn;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      value: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private generateRefreshToken(user: User): Token {
    const secret = AuthConfig.jwtRefreshKey;
    const expiresIn = AuthConfig.jwtRefreshExpiresIn;
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      value: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

  private createCookie(token: Token) {
    return `Authorization=${token.value}; HttpOnly; Max-Age=${token.expiresIn}`;
  }
}

export default AuthController;
