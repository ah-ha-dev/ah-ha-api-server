import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './../user/entities/user.entity';
import {Repository} from 'typeorm';
import {GoogleLoginDto, GoogleLoginResponseDto} from './dto/google-login.dto';
import {OAuth2Client} from 'google-auth-library';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {Plant} from './../plant/entities/plant.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async logInWithGoogle(googleLoginDto: GoogleLoginDto): Promise<any> {
    const oAuth2Client = this.configService.get('googleOAuth2Client');

    const {tokens} = await oAuth2Client.getToken(googleLoginDto.authorizationCode);
    const {email} = await oAuth2Client.getTokenInfo(tokens.access_token);

    let user = await this.userRepository.findOne({
      where: {
        gmail: email,
      },
    });

    if (!user) {
      user = await this.signUpWithGoogle(email, tokens.refresh_token);
    }

    return await this.createAccessToken(user.id);
  }

  async signUpWithGoogle(gmail: string, refreshToken: string): Promise<User> {
    const user = await this.userRepository.save({
      gmail,
      googleRefreshToken: refreshToken,
    });
    await this.plantRepository.save({
      score: 0,
      level: 1,
      user,
    });
    return user;
  }

  async createAccessToken(id: number): Promise<GoogleLoginResponseDto> {
    const payload = {sub: id};
    const accessToken = this.jwtService.sign(payload);
    return {accessToken};
  }
}
