import express from "express";

import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.middleware";

import ServerConfig from "./config/server.config";
import validateEnv from "./utils/validate.env";

class Server {
  app: express.Application;
  path: string;
  port: number;

  constructor(path: string, port: number) {
    this.app = express();
    this.port = port;
    this.path = path;

    this.setupMiddlewares();
    this.setupRoutes();
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
    this.app.use(cookieParser());
    this.app.use(errorMiddleware);
  }

  setupRoutes() {
    this.app.get("/", (req, res) => {
      res.send("Hello, world!");
    });
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`App started at http://${this.path}:${this.port}`);
    });
  }
}

validateEnv();
console.log(ServerConfig.port);
const server = new Server(ServerConfig.path, ServerConfig.port);
server.start();
