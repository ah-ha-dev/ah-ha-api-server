import {Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './../user/entities/user.entity';
import {Repository} from 'typeorm';
import {GoogleLoginDto} from './dto/google-login.dto';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {Err} from './../common/error';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async logInWithGoogle(googleLoginDto: GoogleLoginDto): Promise<any> {
    try {
      const oAuth2Client = this.configService.get('googleOAuth2Client');

      const {tokens} = await oAuth2Client.getToken(googleLoginDto.authorizationCode);
      const {email} = await oAuth2Client.getTokenInfo(tokens.access_token);
      let hasPlant = false;
      let user = await this.userRepository.findOne({
        where: {
          gmail: email,
        },
        relations: ['plant'],
      });

      // 새로운 유저인 경우 회원가입 진행
      if (!user) {
        user = await this.signUpWithGoogle(email, tokens.refresh_token);
      }

      // 유저가 이미 식물 캐릭터를 가지고 있는지 확인
      if (user.plant) {
        hasPlant = true;
      }

      const accessToken = await this.createAccessToken(user.id);
      return {accessToken, hasPlant};
    } catch (error) {
      switch (error.toString()) {
        case 'Error: invalid_grant':
          throw new BadRequestException(Err.CODE.INVALID_CODE);

        default:
          throw new InternalServerErrorException(Err.SERVER.UNEXPECTED_ERROR);
      }
    }
  }

  async signUpWithGoogle(gmail: string, refreshToken: string): Promise<User> {
    const user = await this.userRepository.save({
      gmail,
      googleRefreshToken: refreshToken,
    });
    return user;
  }

  async createAccessToken(id: number): Promise<string> {
    const payload = {sub: id};
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }
}
