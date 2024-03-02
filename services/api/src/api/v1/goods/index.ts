import { Router } from 'express';

import { handleUpdateItemById } from './handleUpdateItemById';
import { handleDeleteItemById } from './handleDeleteItemById';
import { handleBookItemById } from './handleBookItemById';
import { handleCreateItem } from './handleCreateItem';
import { handleGetItemById } from './handleGetItemById';
import { handleGetItems } from './handleGetItems';

const itemsRouter = Router();

itemsRouter.get('/items', handleGetItems);
itemsRouter.get('/items/:itemId', handleGetItemById);
itemsRouter.post('/items', handleCreateItem);
itemsRouter.delete('/items/:itemId', handleDeleteItemById);
itemsRouter.put('/items/:itemId', handleUpdateItemById);
itemsRouter.post('/items/book/:itemId', handleBookItemById);

export default itemsRouter;
