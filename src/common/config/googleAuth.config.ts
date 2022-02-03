import {registerAs} from '@nestjs/config';
import {GoogleAuth} from 'google-auth-library';

// google Auth 관련 환경변수 (프로젝트 전체 권한)
export default registerAs('googleAuth', async (): Promise<GoogleAuth> => {
  return new GoogleAuth({
    credentials: {
      type: process.env.GOOGLE_CREDENTIALS_TYPE,
      private_key: process.env.GOOGLE_CREDENTIALS_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CREDENTIALS_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CREDENTIALS_CLIEND_ID,
    },
    projectId: process.env.GOOGLE_PROJECT_ID,
  });
});
