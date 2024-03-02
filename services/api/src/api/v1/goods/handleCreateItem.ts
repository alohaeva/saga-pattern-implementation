import { Request, Response } from 'express';
import httpStatusCodes from 'status-code-enum';

import { createItemPublisher } from '../../../broker/publishers';
import { randNumber, randProductDescription, randProductName } from '@ngneat/falso';
import { isNormalizedError, toNormalizedError } from '../../../utils/normalError';

import { sendResponse } from '../../../utils/http';

export const handleCreateItem = async (req: Request, res: Response) => {
  const item = await createItemPublisher({
    title: req.body.title ?? randProductName(),
    description: req.body.description ?? randProductDescription(),
    price:
      req.body.price ??
      randNumber({
        min: 10,
        max: 1000,
      }),
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
    result: {
      id: item.result.id,
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
}