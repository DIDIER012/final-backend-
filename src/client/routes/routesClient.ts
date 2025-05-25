import express from "express";
import { getProducts } from "../controllers/productsClient";
import {
    getShop,
  addProductToShop,
  removeProductFromShop,
  clearShop,
  updateProductQuantity,
} from "../controllers/carritoController";

export const routesClient = express.Router();

routesClient.get("/products", getProducts);
routesClient.get("/shop/:userId", getShop);
routesClient.delete("/shop/:userId/clear", clearShop);
routesClient.delete("/shop/:userId/removeProduct/:productId", removeProductFromShop);
routesClient.put("/shop/:userId/updateProductQuantity", updateProductQuantity);
routesClient.post("/addProduct", addProductToShop);

export default routesClient;
