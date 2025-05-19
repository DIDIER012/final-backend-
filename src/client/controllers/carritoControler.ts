import { Request, Response } from "express";
import { ShopModel } from "../../models/shopModel";

// Obtener el carrto
export const getShop = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const shop = await ShopModel.findOne({ userId })
        .populate("userId")
        .populate("products.productId");

        if (!shop) {
            return res.status(404).json({ message: "Carrito not found" });
        }
        return res.status(200).json(shop);
    } catch (error) {
        console.error("Error fetching carrito:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// Agregar un producto al carrito

export const addProductToShop = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        let shop = await ShopModel.findOne({ userId });

        if (!shop) {
            shop = new ShopModel({ userId, products: [] });
        }

        // Verificar si el producto ya está en el carrito
        const existingProductIndex = shop.products.findIndex(
            (product) => product.productId.toString() === productId
        );

        if (existingProductIndex !== -1) {
            shop.products[existingProductIndex].quantity += quantity;
        } else {
            shop.products.push({ productId, quantity });
        }

        await shop.save();
        return res.status(200).json(shop);
    } catch (error) {
        console.error("Error adding product to carrito:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Eliminar un producto del carrito 

export const removeProductFromShop = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { productId } = req.body;

        const shop = await ShopModel.findOne({ userId });

        if (!shop) {
            return res.status(404).json({ message: "Carrito not found" });
        }

        // Filtrar el producto a eliminar
       const shopFilter = shop.products.findIndex(
      (product) => product.productId.toString() === productId);

        if (shopFilter !== -1) {
        shop.products.splice(shopFilter, 1);
}

        await shop.save();
        return res.status(200).json(shop);
    } catch (error) {
        console.error("Error removing product from carrito:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Vaciar el carrito
export const clearShop = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const shop = await ShopModel.findOne({ userId });

        if (!shop) {
            return res.status(404).json({ message: "Carrito not found" });
        }

        shop.products.splice(0, shop.products.length);

        await shop.save();
        return res.status(200).json(shop);
    } catch (error) {
        console.error("Error clearing carrito:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Actualizar la cantidad de un producto en el carrito  
export const updateProductQuantity = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;

        const shop = await ShopModel.findOne({ userId });

        if (!shop) {
            return res.status(404).json({ message: "Carrito not found" });
        }

        const product = shop.products.find(
            (product) => product.productId.toString() === productId
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found in carrito" });
        }
        product.quantity = quantity;

        await shop.save();
        return res.status(200).json(shop);
    } catch (error) {
        console.error("Error updating product quantity in carrito:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};