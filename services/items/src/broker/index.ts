import { Connection } from 'amqplib';

import { generateUuid } from '../utils/generators/generateUuid';

import { getOrCreateBrokerConnection } from './connection';
import { ConsumerHandler } from './types';

export class Broker {
  static connection: Connection;

  static async init(url: string) {
    Broker.connection = await getOrCreateBrokerConnection(url);
  }

  static setUpConsumer(queueName: string, handler: ConsumerHandler) {
    return async () => {
      const channel = await this.connection.createChannel();

      await channel.prefetch(1);

      await channel.assertQueue(queueName, {
        durable: false,
      });

      await channel.consume(queueName, async msg => {
        if (!msg) {
          return;
        }

        const result = await handler(msg);

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(result.toString()), {
          correlationId: msg.properties.correlationId,
        });

        channel.ack(msg);
      });
    };
  }

  static setUpPublisher(queueName: string) {
    return async (data: string | number | Record<string, unknown>) => {
      const channel = await this.connection.createChannel();

      const q = await channel.assertQueue(`${queueName}-reply`, {
        exclusive: true,
      });

      return new Promise(res => {
        const correlationId = generateUuid();

        channel
          .consume(
            q.queue,
            function (msg) {
              if (!msg) return null;

              if (msg.properties.correlationId == correlationId) {
                res(msg);
              }
            },
            {
              noAck: true,
            }
          )
          .then(() => {
            channel.sendToQueue(queueName, Buffer.from(data.toString()), {
              correlationId,
              replyTo: q.queue,
            });
          });
      });
    };
  }
}
