import { diContainer } from '../../containers';
import { ItemRepository } from '../../repositories/item.repository';
import { ITEMS_REPOSITORY } from '../../const/services';
import { isNormalizedError, toNormalizedError } from '../../utils/normalError';

export const handleDeleteItemById = async (data: { id: string }) => {
  const itemRepository = diContainer.get<ItemRepository>(ITEMS_REPOSITORY);

  const result = await itemRepository.deleteById(data.id).catch(toNormalizedError);

  if (isNormalizedError(result)) {
    return {
      success: false,
      result: undefined,
      error: {
        message: result.message,
      },
    };
  }

  return {
    success: true,
    result: {},
  };
};
