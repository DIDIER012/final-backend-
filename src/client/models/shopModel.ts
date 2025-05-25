import { Schema, model, Types } from "mongoose";

const shopSchema = new Schema({
  userId: {
    types: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
}, { timestamps: true });

const ShopModel = model("Shop", shopSchema);

export default ShopModel;
