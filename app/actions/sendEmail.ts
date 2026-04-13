"use server";

import nodemailer from "nodemailer";

export async function sendEmailAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Todos los campos son obligatorios", success: false };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // Te lo envías a ti mismo
      subject: `Nuevo Mensaje de Portafolio: ${name}`,
      text: `Has recibido un nuevo mensaje de contacto en tu portafolio:\n\nNombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
          <h2 style="color: #8b5cf6;">Nuevo Mensaje desde tu Portafolio</h2>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: "Mensaje enviado correctamente" };
  } catch (error) {
    console.error("Error enviando email:", error);
    return { error: "Error enviando el correo. Revisa tus credenciales.", success: false };
  }
}
