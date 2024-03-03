import http, { Server as HttpServer } from 'http';
import path from 'path';

import express, { Express } from 'express';

import { loggerInstance } from '../logger';
import { appConfig } from '../config/Config';
import { Broker } from '../broker';
import MongoDBConnection from '../mongo';
import { diContainer } from '../containers';
import { ITEMS_REPOSITORY, MONGODB_CONNECTION } from '../const/services';
import {
  createItemConsumer,
  deleteByIdConsumer,
  getAllConsumer,
  getByIdConsumer,
  updateByIdConsumer,
} from '../broker/consumers';
import { ItemRepository } from '../repositories/item.repository';

const brokerConnection = appConfig.get('connections.broker');
const mongoUri = appConfig.get('connections.mongo.uri');

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
    if (mongoUri) {
      const mongoInstance = await MongoDBConnection.connect({
        uri: mongoUri,
        schemasPath: path.join(__dirname, '../entities'),
      });

      const itemsRepository = new ItemRepository();

      diContainer.register(MONGODB_CONNECTION, mongoInstance);
      diContainer.register(ITEMS_REPOSITORY, itemsRepository);
    }

    if (brokerConnection) {
      await Broker.init(brokerConnection);

      await createItemConsumer();
      await getAllConsumer();
      await getByIdConsumer();
      await deleteByIdConsumer();
      await updateByIdConsumer();
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
