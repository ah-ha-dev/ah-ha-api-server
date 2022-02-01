import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from '@nestjs/common';
import {Response} from 'express';
import {IncomingWebhook} from '@slack/client';
import sentryConfig from '../config/sentry.config';
import * as Sentry from '@sentry/minimal';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const SentryConfig = sentryConfig();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | {message: any; code: number}
      | {error: string; message: string[]; code: number | null};
    const webhook = new IncomingWebhook(SentryConfig.webhook);

    Sentry.captureException(exception);
    webhook.send({
      attachments: [
        {
          color: 'danger',
          text: '🚨ah-ha-api-server 버그 발생🚨',
          fields: [
            {
              title: `Request Message: ${err.message}`,
              value: exception.stack,
              short: false,
            },
          ],
          ts: Math.floor(new Date().getTime() / 1000).toString(),
        },
      ],
    });
    if (err.code) {
      return response.status(status).json({
        code: err.code,
        message: err.message,
        data: '',
      });
    }
    response.status(status).json({code: status, message: err.message, data: ''});
  }
}
