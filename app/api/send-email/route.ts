import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { to, subject, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    });

     return NextResponse.json({ success: true })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error enviando respuesta:", err.message)
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      )
    }

    console.error("Error desconocido enviando respuesta:", err)
    return NextResponse.json(
      { error: "Error desconocido" },
      { status: 500 }
    )
  }
}
