import { Model, model, Schema } from "mongoose";

interface Product {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    imageUrl: string;
}

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true }
});

const ProductModel: Model<Product> = model<Product>("Product", productSchema);

export default ProductModel;