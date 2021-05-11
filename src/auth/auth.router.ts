import * as express from 'express';
import AuthController from './auth.controller';
import validationMiddleware from '../middleware/validation.middleware';
import LogInDTO from './logIn.dto';
import RegisterDTO from './register.dto';

class AuthRouter {
  public path = '/auth';
  public router: express.Router;
  authController: AuthController = new AuthController();

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() : void {
    this.router.post(`${this.path}/register`, validationMiddleware(RegisterDTO), this.authController.register);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDTO), this.authController.loggingIn);
    this.router.post(`${this.path}/logout`, this.authController.loggingOut);
  }
}

export default AuthRouter;
