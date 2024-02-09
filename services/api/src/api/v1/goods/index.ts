import { Router } from 'express';
import httpStatusCodes from 'status-code-enum';

import { sendResponse } from '../../../utils/http';
import { createItemPublisher, getAllItemsPublisher, getItemByIdPublisher } from '../../../broker/publishers';

const goodsRouter = Router();

goodsRouter.get('/items', async (req, res) => {
  const items = await getAllItemsPublisher();

  return sendResponse(res, {
    result: {
      items,
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

goodsRouter.get('/items/:itemId', async (req, res) => {
  const item = await getItemByIdPublisher({
    id: req.params.itemId,
  });

  return sendResponse(res, {
    result: item,
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

goodsRouter.post('/items', async (req, res) => {
  const item = await createItemPublisher({
    title: 'New Item',
    description: 'New item Description',
    price: 1000,
  });

  return sendResponse(res, {
    result: {
      id: item.result.id,
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

export default goodsRouter;
