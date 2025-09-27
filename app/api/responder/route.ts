import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const { id, to, asunto, mensaje } = await req.json()

    if (!id || !to || !asunto || !mensaje) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 })
    }

    // 🔹 Configuración del transporte con Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // 🔹 Plantilla HTML del correo
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
        <div style="max-width:600px; margin:auto; background:white; border-radius:8px; padding:20px; border:1px solid #ddd;">
          <h2 style="color:#2e7d32; margin-bottom:16px;">📩 Respuesta a tu consulta</h2>
          <p style="font-size:15px; line-height:1.6; color:#333;">
            ${mensaje}
          </p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #eee;"/>
          <p style="font-size:13px; color:#555;">
            Atentamente,<br/>
            <b>Equipo BYB</b><br/>
            📕 Libro de Reclamaciones
          </p>
        </div>
      </div>
    `

    // 🔹 Enviar correo
    await transporter.sendMail({
      from: `"Libro de Reclamaciones" <${process.env.EMAIL_USER}>`,
      to,
      subject: asunto,
      html: htmlContent,
    })

    // 🔹 Marcar como respondido en la BD
    const { error } = await supabase
      .from("reclamos")
      .update({
        respondido: true,
        respuesta: mensaje,
        respondido_en: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) throw error

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