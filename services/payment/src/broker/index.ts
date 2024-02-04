import amqp, { Connection } from 'amqplib';

let brokerClient: Connection | null = null;

const queue = 'rpc_queue';

function fibonacci(n: number): number {
  if (n == 0 || n == 1) return n;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}

export const connectToMQ = async () => {
  if (!brokerClient) {
    brokerClient = await amqp.connect('amqp://localhost:5672');

    const channel = await brokerClient.createChannel();

    await channel.assertQueue(queue, {
      durable: false,
    });

    await channel.prefetch(1);

    await channel.consume(queue, msg => {
      if (!msg) {
        return;
      }

      const n = parseInt(msg.content.toString());

      console.log('[.] fib(%d)', n);

      const r = fibonacci(n);

      channel.sendToQueue(msg.properties.replyTo, Buffer.from(r.toString()), {
        correlationId: msg.properties.correlationId,
      });

      channel.ack(msg);
    });
  }

  return brokerClient;
};
