import nodemailer from "nodemailer";

export const sendLoginEmail = async (to: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tu_correo@gmail.com",
            pass: "tu_contraseña_o_app_password"
        }
    });

    const mailOptions = {
        from: '"Hola 👀" <tu_correo@gmail.com>',
        to,
        subject: "Inicio de sesión detectado",
        text: "Se ha detectado un inicio de sesión exitoso en tu cuenta verifica que en realidad eres tu.",
        html: "<b>Se ha detectado un inicio de sesión exitoso en tu cuenta.</b>"
    };

    await transporter.sendMail(mailOptions);
};
