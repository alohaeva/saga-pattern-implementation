import { Broker } from '../index';
import { handleCreateItem, handleGetAll, handleGetById } from '../../controllers';

export const createItemConsumer = Broker.setUpConsumer('item:create', handleCreateItem);
export const getAllConsumer = Broker.setUpConsumer('item:getAll', handleGetAll);
export const getByIdConsumer = Broker.setUpConsumer('item:getById', handleGetById);
