import {registerAs} from '@nestjs/config';
import * as AWS from 'aws-sdk';

export default registerAs('dynamoDB', async () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  return new AWS.DynamoDB.DocumentClient();
});
