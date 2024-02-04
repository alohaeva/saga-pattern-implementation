import { Router } from 'express';
import httpStatusCodes from 'status-code-enum';

import { sendResponse } from '../../utils/http';

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

export default apiV1Router;
