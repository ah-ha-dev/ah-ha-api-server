import {registerAs} from '@nestjs/config';

// google PubSub 관련 환경변수
export default registerAs('googlePubSub', () => {
  return {
    topicName: process.env.GOOGLE_PUBSUB_TOPIC_NAME,
    subscriptionName: process.env.GOOGLE_PUBSUB_SUBSCRIPTION_NAME,
    projectId: process.env.GOOGLE_PROJECT_ID,
  };
});
