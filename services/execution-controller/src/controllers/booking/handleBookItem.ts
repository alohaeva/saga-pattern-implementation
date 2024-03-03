import { getPaymentDataPublisher, updateItemPublisher } from '../../broker/publishers';
import { isNormalizedError, toNormalizedError } from '../../utils/normalError';
import { BrokerResponse, Item } from '../../types';

export const handleBookItem = async (data: { id: string; data: unknown }): Promise<BrokerResponse<{ url: string }>> => {
  // set item service local transaction to reserved
  const reservedItem = await updateItemPublisher({
    id: data.id,
    data: {
      status: 'reserved',
    },
  }).catch(toNormalizedError);

  if (isNormalizedError(reservedItem) || !reservedItem.success) {
    return {
      success: false,
      error: {
        message: 'Could not reserve the item',
      },
    };
  }

  // make payment
  const getPaymentUrl = await getPaymentDataPublisher({
    id: reservedItem.result.id,
  }).catch(toNormalizedError);

  if (isNormalizedError(getPaymentUrl) || !getPaymentUrl.success) {
    const reservedItem = await updateItemPublisher({
      id: data.id,
      data: {
        status: 'available',
      },
    }).catch(toNormalizedError);

    if (isNormalizedError(reservedItem) || !reservedItem.success) {
      return {
        success: false,
        error: {
          message: 'Could not free the item',
        },
      };
    }

    return {
      success: false,
      error: {
        message: 'Could not generate payment url',
      },
    };
  }

  // set item service local transaction to paid

  // send notification

  return {
    success: true,
    result: getPaymentUrl.result,
  };
};
