import {registerAs} from '@nestjs/config';
import {JwtModuleOptions} from '@nestjs/jwt';

export default registerAs('auth', async (): Promise<JwtModuleOptions> => {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '365d'},
  };
});
