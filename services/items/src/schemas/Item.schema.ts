import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema(
  {
    title: {
      require: true,
      type: mongoose.Schema.Types.String,
    },
    description: {
      require: true,
      type: mongoose.Schema.Types.String,
    },
    price: {
      require: true,
      type: mongoose.Schema.Types.Number,
    },
  },
  {
    timestamps: true,
  }
);

export type ItemSchemaType = {
  id: string;
  title: string;
  price: number;
};

export default itemSchema;
