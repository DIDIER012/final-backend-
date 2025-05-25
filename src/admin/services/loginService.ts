import loginModel from "../models/loginModel";
import bcrypt from "bcrypt";

export async function authenticateUser(email: string, password: string) {
    const user = await loginModel.findOne({ email });

    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
}
