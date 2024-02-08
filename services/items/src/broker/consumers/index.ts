import { plainToInstance } from 'class-transformer';

import { Broker } from '../index';
import MongoDBConnection from '../../mongo';
import { ItemsDto } from '../../dtos/items.dto';

export const createItemConsumer = Broker.setUpConsumer('item:create', async data => {
  try {
    const itemsModel = MongoDBConnection.getModel('Item');

    const [newItem] = await itemsModel.create([data]);

    const parsedItem = plainToInstance(ItemsDto, newItem.toObject(), {
      excludeExtraneousValues: true,
    });

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
});
