import { Broker } from '../index';
import {
  handleCreateItem,
  handleDeleteItemById,
  handleGetAllItems,
  handleGetItemById,
  handleUpdateItemById,
} from '../../controllers';

export const createItemConsumer = Broker.setUpConsumer('item:create', handleCreateItem);
export const getAllConsumer = Broker.setUpConsumer('item:getAll', handleGetAllItems);
export const getByIdConsumer = Broker.setUpConsumer('item:getById', handleGetItemById);
export const deleteByIdConsumer = Broker.setUpConsumer('item:deleteById', handleDeleteItemById);
export const updateByIdConsumer = Broker.setUpConsumer('item:updateById', handleUpdateItemById);
