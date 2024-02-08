import http, { Server as HttpServer } from 'http';

import express, { Express } from 'express';

import { logger, loggerInstance } from '../logger';
import { Broker } from '../broker';
import { testEventConsumer } from '../broker/consumers';


export class Server {
  app: Express;
  server: HttpServer;

  constructor() {
    const app = express();

    app.use(loggerInstance);

    this.catchUncaughtException();

    this.app = app;
    this.server = http.createServer(app);
  }

  async start(port: number) {
    await Broker.init('amqp://localhost:5672');

    testEventConsumer();

    this.server.listen(port);
  }

  catchUncaughtException() {
    process.on('uncaughtException', err => {
      // log the exception
      logger.fatal(err, 'uncaught exception detected');

      this.server.close();
      // shutdown the server gracefully
      process.exit(1); // then exit
    });
  }
}
