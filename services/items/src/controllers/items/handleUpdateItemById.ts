import { ItemSchemaType } from '../../entities/item';
import { diContainer } from '../../containers';
import { ItemRepository } from '../../repositories/item.repository';
import { ITEMS_REPOSITORY } from '../../const/services';
import { isNormalizedError, toNormalizedError } from '../../utils/normalError';

export const handleUpdateItemById = async (data: { id: string; data: Partial<ItemSchemaType> }) => {
  const itemRepository = diContainer.get<ItemRepository>(ITEMS_REPOSITORY);

  const result = await itemRepository.updateById(data.id, data.data).catch(toNormalizedError);

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
    result,
  };
};
