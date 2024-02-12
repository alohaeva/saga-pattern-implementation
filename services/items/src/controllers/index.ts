import { ItemSchemaType } from '../schemas/Item.schema';
import { diContainer } from '../containers';
import { ITEMS_REPOSITORY } from '../const/services';
import { ItemRepository } from '../repositories/item.repository';

export const handleCreateItem = async (data: ItemSchemaType) => {
  try {
    const itemRepository = diContainer.get<ItemRepository>(ITEMS_REPOSITORY);

    const newItem = await itemRepository.create(data);

    return {
      success: true,
      result: newItem,
    };
  } catch (e) {
    return {
      success: false,
      result: {},
    };
  }
};

export const handleGetAll = async () => {
  try {
    const itemRepository = diContainer.get<ItemRepository>(ITEMS_REPOSITORY);

    const items = await itemRepository.find({});

    return {
      success: true,
      result: items,
    };
  } catch (e) {
    return {
      success: true,
      result: {
        world: 'world',
      },
    };
  }
};

export const handleGetById = async (data: { id: string }) => {
  try {
    const itemRepository = diContainer.get<ItemRepository>(ITEMS_REPOSITORY);

    const item = await itemRepository.findById(data.id);

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
  } catch (e) {
    return {
      success: true,
      result: {},
    };
  }
};
