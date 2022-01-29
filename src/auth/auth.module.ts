import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './../user/entities/user.entity';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './strategy/jwt.strategy';
import {Plant} from './../plant/entities/plant.entity';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([User, Plant]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('auth').secret,
          signOptions: config.get('auth').signOptions,
        };
      },
      imports: [ConfigModule],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
