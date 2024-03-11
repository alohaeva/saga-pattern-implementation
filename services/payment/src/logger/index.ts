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
    msgPrefix: '[Payments Service] ',
  }),
  quietReqLogger: true,
});

export const { logger } = loggerInstance;
