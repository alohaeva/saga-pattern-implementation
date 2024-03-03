import { updateItemPublisher } from '../../broker/publishers';
import { isNormalizedError, toNormalizedError } from '../../utils/normalError';
import { BrokerResponse, Item } from '../../types';

export const handleBookItem = async (data: { id: string; data: unknown }): Promise<BrokerResponse<Item>> => {
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

  return {
    success: true,
    result: reservedItem.result,
  };
};
