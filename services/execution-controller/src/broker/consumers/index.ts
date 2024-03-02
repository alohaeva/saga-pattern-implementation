import { Broker } from '../index';

export const startBookingItemConsumer = Broker.setUpConsumer('executionController:bookItem', async message => {
  console.log(message);
  return {
    success: true,
    result: {
      world: 'world',
    },
  };
});
