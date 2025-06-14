import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import "dotenv/config";

connectDB();

const app = express();

app.use(express.json());

// Orígenes permitidos
const allowedOrigins = ["http://127.0.0.1:5500"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true 
}));

import routesClient from "../src/client/routes/routesClients";
//import { routesAdmin } from "./admin/routes/routesAdmin";
app.use("/api/client", routesClient);
//app.use("/api/admin", routesAdmin);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
