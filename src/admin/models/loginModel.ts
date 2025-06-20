import mongoose, { Schema, Document } from "mongoose";

export interface loginModel extends Document {
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.model<loginModel>("User", UserSchema);
