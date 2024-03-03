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
    status: {
      require: true,
      type: mongoose.Schema.Types.String,
      default: 'available',
    },
  },
  {
    timestamps: true,
  }
);

export default itemSchema;
