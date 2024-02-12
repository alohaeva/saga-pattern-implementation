import { plainToInstance } from 'class-transformer';
import { FilterQuery } from 'mongoose';

import MongoDBConnection from '../mongo';
import { ItemSchemaType } from '../schemas/Item.schema';
import { ItemsDto } from '../dtos/items.dto';
import { Nullable } from '../types';
import { withTransaction } from '../mongo/withTransaction';

export class ItemRepository {
  private model = MongoDBConnection.getModel<ItemSchemaType>('Item');

  async create(data: Partial<ItemSchemaType>): Promise<ItemsDto | undefined> {
    return withTransaction<ItemsDto | undefined>(async session => {
      const [newItem] = await this.model.create([data], {
        session,
      });

      if (!newItem) return;

      return plainToInstance(ItemsDto, newItem.toObject(), {
        excludeExtraneousValues: true,
      });
    });
  }

  async find(filter: FilterQuery<ItemSchemaType>): Promise<ItemsDto[] | undefined> {
    return withTransaction<ItemsDto[] | undefined>(async session => {
      const items = await this.model.find(
        filter,
        {},
        {
          session,
        }
      );

      if (!items) return;

      return plainToInstance(
        ItemsDto,
        items.map(item => item.toObject()),
        {
          excludeExtraneousValues: true,
        }
      );
    });
  }

  async findById(id: ItemSchemaType['id']): Promise<ItemsDto | undefined> {
    return withTransaction<ItemsDto | undefined>(async session => {
      const item = await this.model.findOne(
        {
          _id: id,
        },
        {},
        {
          session,
        }
      );

      if (!item) return;

      return plainToInstance(ItemsDto, item.toObject(), {
        excludeExtraneousValues: true,
      });
    });
  }

  async updateById(id: ItemSchemaType['id'], data: Partial<Nullable<ItemSchemaType>>): Promise<ItemsDto | undefined> {
    return withTransaction<ItemsDto | undefined>(async session => {
      const item = await this.model.findOneAndUpdate(
        {
          _id: id,
        },
        data,
        {
          new: true,
          session,
        }
      );

      if (!item) return;

      return plainToInstance(ItemsDto, item.toObject(), {
        excludeExtraneousValues: true,
      });
    });
  }
}
