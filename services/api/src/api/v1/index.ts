import { Router } from 'express';
import httpStatusCodes from 'status-code-enum';

import { sendResponse } from '../../utils/http';

import goodsRouter from './goods';

const apiV1Router = Router();

const startTime = new Date();

apiV1Router.get('/hello', (req, res) => {
  return sendResponse(res, {
    result: {
      startTime: startTime.toISOString(),
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

apiV1Router.use('/v1/goods', goodsRouter);

export default apiV1Router;
