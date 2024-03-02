import { diContainer } from '../../containers';
import { ItemRepository } from '../../repositories/item.repository';
import { ITEMS_REPOSITORY } from '../../const/services';
import { isNormalizedError, toNormalizedError } from '../../utils/normalError';

export const handleGetItemById = async (data: { id: string }) => {
  const itemRepository = diContainer.get<ItemRepository>(ITEMS_REPOSITORY);

  const item = await itemRepository.findById(data.id).catch(toNormalizedError);

  if (isNormalizedError(item)) {
    return {
      success: false,
      result: undefined,
      error: {
        message: item.message,
      },
    };
  }

  if (!item) {
    return {
      success: true,
      result: {},
    };
  }

  return {
    success: true,
    result: item,
  };
};