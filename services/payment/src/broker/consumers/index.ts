import { Broker } from '../index';
import { handleGetPaymentData, handleCreateItemProduct } from '../../controllers';

export const getPaymentDataConsumer = Broker.setUpConsumer('payments:start', handleGetPaymentData);
export const createItemProductConsumer = Broker.setUpConsumer('payments:item:createProduct', handleCreateItemProduct);
