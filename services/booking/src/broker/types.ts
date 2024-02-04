import { Connection, ConsumeMessage } from 'amqplib';

export type ConsumerHandler = (message: ConsumeMessage) => Promise<{ success: boolean; result?: unknown }>;

export type SetUpQueues = {
  connection: Connection;
  queues: {
    handler: (message: ConsumeMessage) => Promise<{ success: boolean; result?: unknown }>;
    queueName: string;
  }[];
};
