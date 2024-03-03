import { plainToInstance } from 'class-transformer';
import { FilterQuery } from 'mongoose';

import MongoDBConnection from '../mongo';
import { ItemsDto, ItemSchemaType } from '../entities/item';
import { Nullable, QueryParams } from '../types';

import { BaseRepository } from './base.repository';

export class ItemRepository extends BaseRepository {
  private model = MongoDBConnection.getModel<ItemSchemaType>('Item');

  async create(data: Partial<ItemSchemaType>): Promise<ItemsDto | undefined> {
    return this.withTransaction<ItemsDto | undefined>(async session => {
      const [newItem] = await this.model.create([data], {
        session,
      });

      if (!newItem) return;

      return plainToInstance(ItemsDto, newItem.toObject(), {
        excludeExtraneousValues: true,
      });
    });
  }

  async find(filter: FilterQuery<ItemSchemaType>, options: QueryParams): Promise<ItemsDto[] | undefined> {
    return this.withTransaction<ItemsDto[] | undefined>(async session => {
      const items = await this.model.find(
        filter,
        {},
        {
          skip: options.page * options.limit,
          limit: options.limit,
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
    return this.withTransaction<ItemsDto | undefined>(async session => {
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

  async deleteById(id: ItemSchemaType['id']): Promise<undefined> {
    return this.withTransaction<undefined>(async session => {
      await this.model.deleteOne(
        {
          _id: id,
        },
        {
          session,
        }
      );

      return;
    });
  }

  async updateById(id: ItemSchemaType['id'], data: Partial<Nullable<ItemSchemaType>>): Promise<ItemsDto | undefined> {
    return this.withTransaction<ItemsDto | undefined>(async session => {
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
