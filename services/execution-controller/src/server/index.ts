import http, { Server as HttpServer } from 'http';

import express, { Express } from 'express';

import { Broker } from '../broker';
import { appConfig } from '../config/Config';
import { loggerInstance } from '../logger';
import { startBookingItemConsumer } from '../broker/consumers';

const brokerConnection = appConfig.get('connections.broker');

export class Server {
  app: Express;
  server: HttpServer;

  constructor() {
    const app = express();

    this.catchUncaughtException();

    this.app = app;
    this.server = http.createServer(app);
  }

  async start(port: number) {
    if (brokerConnection) {
      await Broker.init(brokerConnection);

      await startBookingItemConsumer();
    }

    this.server.listen(port);
  }

  catchUncaughtException() {
    process.on('uncaughtException', err => {
      // log the exception
      loggerInstance.fatal(err, 'uncaught exception detected');

      this.server.close();
      // shutdown the server gracefully
      process.exit(1); // then exit
    });
  }
}
