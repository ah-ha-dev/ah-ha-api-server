import {registerAs} from '@nestjs/config';

// google PubSub 관련 환경변수
export default registerAs('firebase', () => {
  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
});
