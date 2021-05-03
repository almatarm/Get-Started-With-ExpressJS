import "dotenv/config";
class ServerConfig {
  static path: string = process.env.LOGOS_PATH;
  static port: number = +process.env.LOGOS_PORT;
}

export default ServerConfig;
