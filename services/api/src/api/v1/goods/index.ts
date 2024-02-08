import { Router } from 'express';
import httpStatusCodes from 'status-code-enum';

import { sendResponse } from '../../../utils/http';
import { createItemPublisher } from '../../../broker/publishers';

const goodsRouter = Router();

goodsRouter.get('/items', (req, res) => {
  return sendResponse(res, {
    result: {
      goods: [
        {
          id: 'id-1',
        },
      ],
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

goodsRouter.get('/items/:itemId', (req, res) => {
  return sendResponse(res, {
    result: {
      goods: {
        id: `id-${req.params.itemId}`,
      },
    },
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

  console.log(item);

  return sendResponse(res, {
    result: {
      id: item.result.id,
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

export default goodsRouter;
