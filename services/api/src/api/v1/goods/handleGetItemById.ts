import { Request, Response } from 'express';
import httpStatusCodes from 'status-code-enum';

import { getItemByIdPublisher } from '../../../broker/publishers';
import { sendResponse } from '../../../utils/http';
import { isNormalizedError } from '../../../utils/normalError';

export const handleGetItemById = async (req: Request, res: Response) => {
  const item = await getItemByIdPublisher({
    id: req.params.itemId,
  });

  if (isNormalizedError(item)) {
    return sendResponse(res, {
      status: httpStatusCodes.ClientErrorBadRequest,
      success: false,
      error: {
        code: httpStatusCodes.ClientErrorBadRequest,
        message: 'Failed get item by id',
      },
    });
  }

  return sendResponse(res, {
    result: item,
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
}