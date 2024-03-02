import httpStatusCodes from 'status-code-enum';
import { Request, Response } from 'express';

import { startItemBookingPublisher } from '../../../broker/publishers';
import { isNormalizedError, toNormalizedError } from '../../../utils/normalError';
import { sendResponse } from '../../../utils/http';

export const handleBookItemById = async (req: Request, res: Response) => {
  const item = await startItemBookingPublisher({
    id: req.params.itemId,
    data: req.body,
  }).catch(toNormalizedError);

  if (isNormalizedError(item)) {
    return sendResponse(res, {
      status: httpStatusCodes.ClientErrorBadRequest,
      success: false,
      error: {
        code: httpStatusCodes.ClientErrorBadRequest,
        message: 'Failed item booking',
      },
    });
  }

  return sendResponse(res, {
    result: item,
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
}