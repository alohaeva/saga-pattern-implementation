import { Router } from 'express';
import httpStatusCodes from 'status-code-enum';

import { sendResponse } from '../../utils/http';

import itemsRouter from './goods';

const apiV1Router = Router();

const startTime = new Date();

apiV1Router.get('/health', (req, res) => {
  return sendResponse(res, {
    result: {
      startTime: startTime.toISOString(),
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
});

apiV1Router.use('/v1', itemsRouter);

export default apiV1Router;
