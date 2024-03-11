import { ItemSchemaType } from '../../entities/item';
import { diContainer } from '../../containers';
import { ItemRepository } from '../../repositories/item.repository';
import { ITEMS_REPOSITORY } from '../../const/services';
import { isNormalizedError, toNormalizedError } from '../../utils/normalError';
import { createItemProductPublisher } from '../../broker/publishers';

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

  if (!newItem) {
    return {
      success: false,
      result: undefined,
      error: {
        message: 'item not created',
      },
    };
  }

  const createdProduct = await createItemProductPublisher({
    id: newItem.id,
    title: newItem.title,
    description: newItem.description,
    price: data.price,
  }).catch(toNormalizedError);

  if (isNormalizedError(createdProduct)) {
    return {
      success: false,
      result: undefined,
      error: {
        message: createdProduct.message,
      },
    };
  }

  return {
    success: true,
    result: newItem,
  };
};
