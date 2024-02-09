import { MongoError, TransactionOptions } from 'mongodb';
import { ClientSession } from 'mongoose';

import MongoDBConnection from './index';

export const withTransaction = (fn: (data: any, session: ClientSession) => unknown) => async (data: any) => {
  const transactionOptions: TransactionOptions = {
    readConcern: {
      level: 'snapshot',
    },
    writeConcern: {
      w: 'majority',
    },
    readPreference: 'primary',
  };

  const client = MongoDBConnection.getClient();

  if (client) {
    const session = await client.startSession();

    try {
      session.startTransaction(transactionOptions);

      const result = await fn(data, session);

      await session.commitTransaction();

      return result;
    } catch (error) {
      if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
        // add your logic to retry or handle the error
      } else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
        // add your logic to retry or handle the error
      } else {
        console.log('An error occurred in the transaction, performing a data rollback:' + error);
      }
      await session.abortTransaction();
      return;
    } finally {
      await session.endSession();
    }
  }
};
