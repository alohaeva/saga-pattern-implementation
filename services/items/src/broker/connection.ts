import amqp, { Connection } from 'amqplib';

let brokerClient: Connection | null = null;

export const getOrCreateBrokerConnection = async (url: string) => {
  if (!brokerClient) {
    brokerClient = await amqp.connect(url);
  }

  return brokerClient;
};
