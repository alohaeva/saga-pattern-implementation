import { Connection } from 'amqplib';

import { generateUuid } from '../utils/generators/generateUuid';

import { getOrCreateBrokerConnection } from './connection';
import { ConsumerHandler } from './types';

export class Broker {
  static connection: Connection;

  static async init(connection: { protocol: string; host: string; port: number }) {
    const url = `${connection.protocol}://${connection.host}:${connection.port}`;

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

        const content = msg.content.toString();

        const result = await handler(JSON.parse(content));

        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(result), 'utf8'), {
          correlationId: msg.properties.correlationId,
        });

        channel.ack(msg);
      });
    };
  }

  static setUpPublisher<T extends Record<string, unknown>>(queueName: string) {
    return async (data?: string | number | Record<string, unknown>) => {
      const channel = await this.connection.createChannel();

      const q = await channel.assertQueue('', {
        exclusive: true,
      });

      return new Promise<T>(res => {
        const correlationId = generateUuid();

        channel
          .consume(
            q.queue,
            function (msg) {
              if (!msg) return null;

              if (msg.properties.correlationId == correlationId) {
                try {
                  const content = msg.content.toString();

                  res(JSON.parse(content));
                } catch (e) {
                  console.log(e);
                }
              }
            },
            {
              noAck: true,
            }
          )
          .then(() => {
            const payload = JSON.stringify(data ?? {});

            channel.sendToQueue(queueName, Buffer.from(payload, 'utf8'), {
              correlationId,
              replyTo: q.queue,
            });
          });
      });
    };
  }
}
