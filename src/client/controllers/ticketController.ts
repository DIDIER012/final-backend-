import { Request, Response } from "express";
import  ShopModel  from "../models/shopModel";
import { TicketModel } from "../models/ticketModels";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const shop = await ShopModel.findOne({ userId }).populate("products.productId").populate("userId");

    if (!shop || shop.products.length === 0) {
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    let total = 0;

    // Verificar stock y calcular total
    for (const item of shop.products) {
      const product = item.productId as any;
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para ${product.name}` });
      }
      total += product.price * item.quantity;
    }

    // Descontar stock
    for (const item of shop.products) {
      const product = item.productId as any;
      product.stock -= item.quantity;
      await product.save();
    }

    // Crear ticket
    const ticket = new TicketModel({
      amount: total,
      purchaser: (shop.userId as any).email, // supondremos que el modelo de usuario tiene `email`
    });

    await ticket.save();

    // Vaciar carrito
    shop.products = [];
    await shop.save();

    return res.status(201).json({ message: "Compra realizada con éxito", ticket });
  } catch (error) {
    console.error("Error al crear ticket:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
