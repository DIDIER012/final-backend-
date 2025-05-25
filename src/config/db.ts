import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("✅ Base de datos conectada con éxito");
    } catch (error: unknown) {
        console.error("❌ Error al conectar la base de datos:", (error as Error).message);
    }
};

export default connectDB;