import 'dotenv/config';

class MongdbConfig {
  static port: string = process.env.MONGODB_PORT;
  static host: string = process.env.MONGODB_HOST;
  static db:   string = process.env.MONGODB_DB;
}

export default MongdbConfig;
