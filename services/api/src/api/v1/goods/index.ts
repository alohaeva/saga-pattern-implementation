import { Router } from 'express';
import httpStatusCodes from 'status-code-enum';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { randNumber, randProductName, randProductDescription } from '@ngneat/falso';

import { sendResponse } from '../../../utils/http';
import {
  createItemPublisher,
  deleteItemPublisher,
  getAllItemsPublisher,
  getItemByIdPublisher,
  updateItemPublisher,
} from '../../../broker/publishers';
import { QueryDto } from '../../../dto/query.dto';

const itemsRouter = Router();

itemsRouter.get('/items', async (req, res) => {
  const queryDto = plainToInstance(QueryDto, req.query, {
    excludeExtraneousValues: true,
  });

  const items = await getAllItemsPublisher(instanceToPlain(queryDto));

  return sendResponse(res, {
    result: {
      items,
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

itemsRouter.get('/items/:itemId', async (req, res) => {
  const item = await getItemByIdPublisher({
    id: req.params.itemId,
  });

  return sendResponse(res, {
    result: item,
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

itemsRouter.post('/items', async (req, res) => {
  const item = await createItemPublisher({
    title: randProductName(),
    description: randProductDescription(),
    price: randNumber({
      min: 10,
      max: 1000,
    }),
  });

  return sendResponse(res, {
    result: {
      id: item.result.id,
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

itemsRouter.delete('/items/:itemId', async (req, res) => {
  await deleteItemPublisher({
    id: req.params.itemId,
  });

  return sendResponse(res, {
    result: {},
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

itemsRouter.put('/items/:itemId', async (req, res) => {
  const item = await updateItemPublisher({
    id: req.params.itemId,
    data: req.body,
  });

  return sendResponse(res, {
    result: item,
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

export default itemsRouter;
