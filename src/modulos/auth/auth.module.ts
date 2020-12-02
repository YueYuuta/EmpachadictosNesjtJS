import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Configuration } from '@src/config/config.keys';
import { ConfigModule } from '@src/config/config.module';
import { ConfigService } from '@src/config/config.service';
import { JwtStrategy } from './estrategias/jwt.strategy';
import { LoginCasoUso } from './login-caso-uso/login';
import { TokenCasoUso } from './login-caso-uso/refrescar-token';
import { AuthController } from './api/login.controller';
import { AuthRepoProvider } from './repository/auth-provider';
import { AuthRepoService } from './repository/AuthRepoImplementacion';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './repository/auth.repository';
import { UsuarioAlmacenModule } from '../usuario-almacen/usuario-almacen.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          secret: config.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: 3600 * 20,
          },
        };
      },
    }),
    ConfigModule,
    UsuarioAlmacenModule,
  ],
  providers: [
    JwtStrategy,
    LoginCasoUso,
    TokenCasoUso,
    AuthRepoProvider,
    AuthRepoService,
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
