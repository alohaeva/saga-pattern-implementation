import { Broker } from '../index';

type BrokerResponse<T> = {
  success: boolean;
  result: T;
};

type Item = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export const createItemPublisher = Broker.setUpPublisher<BrokerResponse<{ id: string }>>('item:create');
export const getItemByIdPublisher = Broker.setUpPublisher<BrokerResponse<Item>>('item:getById');
export const getAllItemsPublisher = Broker.setUpPublisher<BrokerResponse<Item[]>>('item:getAll');
