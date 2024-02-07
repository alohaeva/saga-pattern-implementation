import { ConsumeMessage } from 'amqplib';

export type ConsumerHandler = (message: ConsumeMessage) => Promise<{ success: boolean; result?: unknown }>;
