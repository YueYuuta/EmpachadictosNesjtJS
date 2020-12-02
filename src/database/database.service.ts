import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ConnectionOptions } from 'typeorm';
import { Configuration } from '../config/config.keys';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: config.get(Configuration.TYPE),
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        port: Number(config.get(Configuration.PORT_DB)),
        database: config.get(Configuration.DATABASE),
        password: config.get(Configuration.PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        synchronize: Boolean(config.get(Configuration.SYNCHRONIZE)),
      } as ConnectionOptions;
    },
  }),
];
