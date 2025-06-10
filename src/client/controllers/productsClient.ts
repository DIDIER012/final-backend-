import ProductModel from '../../models/productsModel';
import { Request, Response } from 'express';

// Obtener todos los productos
const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find();

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Obtener un producto por su ID
const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product); 
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }};


export { getProducts, getProductById };

    