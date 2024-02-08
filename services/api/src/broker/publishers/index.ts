import { Broker } from '../index';

type BrokerResponse<T> = {
  success: boolean;
  result: T;
};

export const createItemPublisher = Broker.setUpPublisher<BrokerResponse<{ id: string }>>('item:create');
