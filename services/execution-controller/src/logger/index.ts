import pino from 'pino';

export const loggerInstance = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  msgPrefix: '[Saga Execution Controller] ',
});
