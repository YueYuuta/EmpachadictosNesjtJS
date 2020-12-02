import * as fs from 'fs';
import { parse } from 'dotenv';
import * as path from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = path.join(__dirname + './../../.env');

      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }

      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        TYPE: process.env.TYPE_DB,
        HOST: process.env.RDS_HOSTNAME,
        PORT_DB: process.env.RDS_PORRT,
        USERNAME: process.env.RDS_USERNAME,
        PASSWORD: process.env.RDS_PASSWORD,
        DATABASE: process.env.RDS_DB_NAME,
        SYNCHRONIZE: process.env.TYPEORM_SYNC,
        PORT_SERVER: process.env.PORT,
        JWT_SECRET: process.env.JWT_SECRET,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
