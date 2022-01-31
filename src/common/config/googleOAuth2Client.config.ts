import {registerAs} from '@nestjs/config';
import {OAuth2Client} from 'google-auth-library';

// google oAuth2Client 관련 환경변수 (사용자 권한)
export default registerAs('googleOAuth2Client', async (): Promise<OAuth2Client> => {
  return new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
  });
});
