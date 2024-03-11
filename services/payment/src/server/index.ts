import http, { Server as HttpServer } from 'http';

import express, { Express } from 'express';

import { logger, loggerInstance } from '../logger';
import { Broker } from '../broker';
import { createItemProductConsumer, getPaymentDataConsumer } from '../broker/consumers';
import { appConfig } from '../config/Config';
import { diContainer } from '../containers';
import { StripePaymentsService } from '../services';
import { PAYMENT_SERVICE } from '../const/services';

const brokerConnection = appConfig.get('connections.broker');
const skToken = appConfig.get('common.paymentSecretToken');

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
    if (brokerConnection) {
      await Broker.init(brokerConnection);

      await getPaymentDataConsumer();
      await createItemProductConsumer();
    }

    if (skToken) {
      const stripeInstance = new StripePaymentsService(skToken);

      diContainer.register(PAYMENT_SERVICE, stripeInstance);
    }

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
