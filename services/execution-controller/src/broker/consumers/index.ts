import { Broker } from '../index';
import { handleBookItem } from '../../controllers';

export const startBookingItemConsumer = Broker.setUpConsumer('executionController:bookItem', handleBookItem);
