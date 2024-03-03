import { readdir } from 'fs/promises';
import path from 'path';

import mongoose, { Mongoose } from 'mongoose';

import { firstLetterToUpperCase } from '../utils/transformers/firstLetterToUpperCase';

type MongoDbConnectionOptions = {
  uri: string;
  schemasPath: string;
};

class MongoDBConnection {
  static client: Mongoose | null;

  static async connect(opts: MongoDbConnectionOptions): Promise<Mongoose | null> {
    if (!(this.client instanceof Mongoose)) {
      this.client = await mongoose.connect(opts.uri);

      await this.loadSchemas(opts.schemasPath);
    }

    return this.client;
  }

  static getModel<ModelType>(modelString: string) {
    return mongoose.model<ModelType>(modelString);
  }

  static getClient(): Mongoose | null {
    return this.client;
  }

  static async loadSchemas(schemasPath: MongoDbConnectionOptions['schemasPath']) {
    try {
      const schemas = await readdir(schemasPath, {
        recursive: true,
      });

      schemas
        .filter(file => file.includes('.schema.'))
        .forEach(file => {
          const modelName = file.replace(/(.*\/)/, '').split('.')[0];

          // eslint-disable-next-line
          const data = require(`${path.join(schemasPath, file)}`).default;
          mongoose.model(firstLetterToUpperCase(modelName), data);
        });
    } catch (e) {
      console.log(e);
    }
  }
}

export default MongoDBConnection;
