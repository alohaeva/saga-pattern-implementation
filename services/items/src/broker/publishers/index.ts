import { Broker } from '../index';

export const publishTestEvent = Broker.setUpPublisher('test-event-publisher');
export const createItemProductPublisher = Broker.setUpPublisher('payments:item:createProduct');
