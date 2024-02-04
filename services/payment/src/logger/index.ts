import pinoHttp from 'pino-http';
import pino from 'pino';

export const loggerInstance = pinoHttp({
  logger: pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    msgPrefix: '[NodeJS - Express - Boilerplate] ',
  }),
  quietReqLogger: true,
  customReceivedMessage(req) {
    return `${req.method} ${req.url} incoming message`;
  },
  customSuccessMessage(req, res, responseTime) {
    return `${req.method} ${req.url} completed with ${res.statusCode} status after ${responseTime}ms`;
  },
});

export const { logger } = loggerInstance;
