import express from "express";

import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";
import { log } from './utils/logger';

import ServerConfig from "./config/server.config";
import MongodbConfig from './config/mongdb.config';
import validateEnv from "./utils/validate.env";

import mongoose from "mongoose";

import AuthRouter from './auth/auth.router';
import AuthConfig from "./config/auth.config";
class Server {
  app: express.Application;
  path: string;
  port: number;

  constructor(path: string, port: number) {
    this.app = express();
    this.port = port;
    this.path = path;

    this.setupMiddlewares();
    this.connectToMongodb();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: false
      })
    );
    this.app.use(cookieParser(AuthConfig.cookiesSignKey));
  }

  private connectToMongodb() {
    const MONGODB_URI = 'mongodb://' + MongodbConfig.host +
      ':' + MongodbConfig.port + '/' + MongodbConfig.db;
    const connection = mongoose.connection;

    connection.on('connected', () => {
      log.info('Mongo Connection Established');
    });

    connection.on('reconnected', () => {
      log.info('Mongo Connection Reestablished');
    });

    connection.on('disconnected', () => {
      log.info('Mongo Connection Disconnected');
      log.info('Trying to reconnect to Mongo ...');
      setTimeout(() => {
        mongoose.connect(MONGODB_URI, {
          keepAlive: true,
          socketTimeoutMS: 3000,
          connectTimeoutMS: 3000,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      }, 3000);
    });

    connection.on('close', () => {
      log.info('Mongo Connection Closed');
    });

    connection.on('error', (error: Error) => {
      log.error('Mongo Connection ERROR: ', error);
    });

    const run = async () => {
      await mongoose.connect(MONGODB_URI, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    };

    run().catch(error => log.error('Mongo Connection ERROR: ', error));
  }

  setupRoutes() {
    console.log(this.path)
    this.app.use(this.path, (new AuthRouter()).router);
  }

  private setupErrorHandling() {
    this.app.use(errorMiddleware);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`App started at http://${this.path}:${this.port}`);
    });
  }
}

validateEnv();
const server = new Server(ServerConfig.path, ServerConfig.port);
server.start();
