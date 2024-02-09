import { plainToInstance } from 'class-transformer';
import { ClientSession } from 'mongoose';

import MongoDBConnection from '../mongo';
import { ItemsDto } from '../dtos/items.dto';
import { ItemSchemaType } from '../schemas/Item.schema';
import { withTransaction } from '../mongo/withTransaction';

const createItem = withTransaction(async (data: ItemSchemaType, session: ClientSession) => {
  const itemsModel = MongoDBConnection.getModel('Item');

  const [newItem] = await itemsModel.create([data], {
    session: session,
  });

  return plainToInstance(ItemsDto, newItem.toObject(), {
    excludeExtraneousValues: true,
  });
});

export const handleCreateItem = async (data: ItemSchemaType) => {
  try {
    const newItem = createItem(data);

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
    const itemsModel = MongoDBConnection.getModel('Item');

    const items = await itemsModel.find({});

    const parsedItem = plainToInstance(
      ItemsDto,
      items.map(item => item.toObject()),
      {
        excludeExtraneousValues: true,
      }
    );

    return {
      success: true,
      result: parsedItem,
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
    const itemsModel = MongoDBConnection.getModel('Item');

    const item = await itemsModel.findById(data.id);

    if (!item) {
      return {
        success: true,
        result: {},
      };
    }

    const parsedItem = plainToInstance(ItemsDto, item.toObject(), {
      excludeExtraneousValues: true,
    });

    return {
      success: true,
      result: parsedItem,
    };
  } catch (e) {
    return {
      success: true,
      result: {},
    };
  }
};
