import { Broker } from '../index';
import { BrokerResponse, Item } from '../../types';

export const updateItemPublisher = Broker.setUpPublisher<BrokerResponse<Item>>('item:updateById');
