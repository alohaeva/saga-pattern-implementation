import httpStatusCodes from 'status-code-enum';
import { Request, Response } from 'express';

import { deleteItemPublisher } from '../../../broker/publishers';
import { sendResponse } from '../../../utils/http';
import { isNormalizedError, toNormalizedError } from '../../../utils/normalError';

export const handleDeleteItemById = async (req: Request, res: Response) => {
  const result = await deleteItemPublisher({
    id: req.params.itemId,
  }).catch(toNormalizedError);

  if (isNormalizedError(result)) {
    return sendResponse(res, {
      status: httpStatusCodes.ClientErrorBadRequest,
      success: false,
      error: {
        code: httpStatusCodes.ClientErrorBadRequest,
        message: 'Failed item update',
      },
    });
  }

  return sendResponse(res, {
    result: {},
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
};
