import {registerAs} from '@nestjs/config';

// sentry 환경변수
export default registerAs('sentry', () => {
  return {
    dsn: process.env.SENTRY_DSN,
    webhook: process.env.SLACK_WEBHOOK,
  };
});
