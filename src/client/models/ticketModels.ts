import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const ticketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    default: () => uuidv4(), // Genera un UUID único
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true, // Este es el email del usuario
  },
});

export const TicketModel = mongoose.model("Ticket", ticketSchema);
