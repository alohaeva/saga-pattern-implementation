import { QueryParams } from '../../types';
import { diContainer } from '../../containers';
import { ItemRepository } from '../../repositories/item.repository';
import { ITEMS_REPOSITORY } from '../../const/services';
import { isNormalizedError, toNormalizedError } from '../../utils/normalError';

export const handleGetAllItems = async (query: QueryParams) => {
  const itemRepository = diContainer.get<ItemRepository>(ITEMS_REPOSITORY);

  const items = await itemRepository.find({}, query).catch(toNormalizedError);

  if (isNormalizedError(items)) {
    return {
      success: false,
      result: undefined,
      error: {
        message: items.message,
      },
    };
  }

  return {
    success: true,
    result: items,
  };
};
