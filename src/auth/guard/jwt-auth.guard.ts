import {Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {Err} from './../../common/error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (user) {
      return user;
    }
    switch (info.toString()) {
      case 'Error: No auth token':
        throw new UnauthorizedException(Err.TOKEN.NOT_SEND_TOKEN);

      case 'JsonWebTokenError: invalid signature':
        throw new UnauthorizedException(Err.TOKEN.INVALID_TOKEN);

      case 'TokenExpiredError: jwt expired':
        throw new UnauthorizedException(Err.TOKEN.JWT_EXPIRED);

      default:
        throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
    }
  }
}
