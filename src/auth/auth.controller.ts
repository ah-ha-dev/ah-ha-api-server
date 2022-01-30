import {Controller, Post, Body} from '@nestjs/common';
import {AuthService} from './auth.service';
import {GoogleLoginDto} from './dto/google-login.dto';
import {docs} from './auth.docs';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  @docs.logInWithGoogle('구글 로그인')
  async logInWithGoogle(@Body() googleLoginDto: GoogleLoginDto) {
    return await this.authService.logInWithGoogle(googleLoginDto);
  }
}
