import { Router } from 'express';
import httpStatusCodes from 'status-code-enum';

import { sendResponse } from '../../../utils/http';

const goodsRouter = Router();

goodsRouter.get('/', (req, res) => {
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

goodsRouter.get('/:itemId', (req, res) => {
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

export default goodsRouter;