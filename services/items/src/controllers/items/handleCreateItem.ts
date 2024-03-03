import { ItemSchemaType } from '../../entities/item';
import { diContainer } from '../../containers';
import { ItemRepository } from '../../repositories/item.repository';
import { ITEMS_REPOSITORY } from '../../const/services';
import { isNormalizedError, toNormalizedError } from '../../utils/normalError';

export const handleCreateItem = async (data: ItemSchemaType) => {
  const itemRepository = diContainer.get<ItemRepository>(ITEMS_REPOSITORY);

  const newItem = await itemRepository.create(data).catch(toNormalizedError);

  if (isNormalizedError(newItem)) {
    return {
      success: false,
      result: undefined,
      error: {
        message: newItem.message,
      },
    };
  }

  return {
    success: true,
    result: newItem,
  };
};
