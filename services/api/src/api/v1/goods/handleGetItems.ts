import httpStatusCodes from 'status-code-enum';
import { Request, Response } from 'express';

import { instanceToPlain, plainToInstance } from 'class-transformer';
import { QueryDto } from '../../../dto/query.dto';
import { getAllItemsPublisher } from '../../../broker/publishers';
import { sendResponse } from '../../../utils/http';
import { isNormalizedError } from '../../../utils/normalError';

export const handleGetItems = async (req: Request, res: Response) => {
  const queryDto = plainToInstance(QueryDto, req.query, {
    excludeExtraneousValues: true,
  });

  const items = await getAllItemsPublisher(instanceToPlain(queryDto));

  if (isNormalizedError(items)) {
    return sendResponse(res, {
      status: httpStatusCodes.ClientErrorBadRequest,
      success: false,
      error: {
        code: httpStatusCodes.ClientErrorBadRequest,
        message: 'Failed get items',
      },
    });
  }

  return sendResponse(res, {
    result: {
      items,
    },
    status: httpStatusCodes.SuccessOK,
    success: true,
  });
}