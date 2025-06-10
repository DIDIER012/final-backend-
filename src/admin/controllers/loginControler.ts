import { Request, Response } from "express";
import { authenticateUser } from "../../admin/services/loginService";
import { sendLoginEmail } from "../../admin/helpers/mailingResgister";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await authenticateUser(email, password);

        if (!user) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        await sendLoginEmail(email);

        
        return res.status(200).json({ message: "Login exitoso", userId: user._id });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
