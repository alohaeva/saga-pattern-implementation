import { Broker } from '../index';

export const createItemConsumer = Broker.setUpConsumer('item:create', async message => {
  console.log(message);
  return {
    success: true,
    result: {
      world: 'world',
    },
  };
});
