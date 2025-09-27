import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type Reclamo = {
  nombre: string
  documento: string
  email: string
  telefono: string
  servicio: string
  tipo: string
  detalle: string
  pedido: string
}

export async function POST(req: Request) {
  try {
    const data: Reclamo = await req.json()

    // ✅ Validación mínima
    if (!data.nombre || !data.email || !data.tipo) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios" },
        { status: 400 }
      )
    }

    // ✅ Guardar en Supabase
    const { error } = await supabase.from("reclamos").insert([data])
    if (error) throw error

    // ✅ Correo al negocio
    await resend.emails.send({
      from: "Libro de Reclamaciones <onboarding@resend.dev>",
      to: "byb.contacto.oficial@gmail.com",
      subject: `📩 Nuevo ${data.tipo} - ${data.nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:8px; max-width:600px; margin:auto;">
          <h2 style="color:#d32f2f;">📕 Nuevo registro en el Libro de Reclamaciones</h2>
          <p>Se ha recibido un <b>${data.tipo}</b> de un cliente:</p>
          <ul style="line-height:1.6;">
            <li><b>Nombre:</b> ${data.nombre}</li>
            <li><b>Documento:</b> ${data.documento}</li>
            <li><b>Email:</b> ${data.email}</li>
            <li><b>Teléfono:</b> ${data.telefono}</li>
            <li><b>Servicio:</b> ${data.servicio}</li>
            <li><b>Detalle:</b> ${data.detalle}</li>
            <li><b>Pedido:</b> ${data.pedido}</li>
          </ul>
          <p style="margin-top:20px; font-size:14px; color:#555;">Este mensaje fue generado automáticamente por el sistema del Libro de Reclamaciones.</p>
        </div>
      `,
    })

    const correoNegocio = await resend.emails.send({
      from: "Libro de Reclamaciones <onboarding@resend.dev>",
      to: "byb.contacto.oficial@gmail.com",
      subject: `📩 Nuevo ${data.tipo} - ${data.nombre}`,
      html: `...`,
    })

    console.log("📩 Respuesta correo negocio:", correoNegocio)


    // ✅ Confirmación al cliente
    await resend.emails.send({
      from: "Libro de Reclamaciones <onboarding@resend.dev>",
      to: data.email,
      subject: "✅ Confirmación de tu Reclamo/Queja",
      html: `
        <div style="font-family: Arial, sans-serif; padding:20px; border:1px solid #eee; border-radius:8px; max-width:600px; margin:auto;">
          <h2 style="color:#2e7d32;">✅ Confirmación de recepción</h2>
          <p>Hola <b>${data.nombre}</b>,</p>
          <p>Hemos recibido tu <b>${data.tipo.toLowerCase()}</b> correctamente. Nuestro equipo lo revisará y te daremos respuesta en un plazo máximo de <b>30 días calendario</b>.</p>
          <p style="margin-top:20px;">Gracias por comunicarte con nosotros.</p>
          <hr style="margin:20px 0;"/>
          <p style="font-size:13px; color:#777;">📕 Libro de Reclamaciones - BYB</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    // validación segura para unknown
    if (err instanceof Error) {
      console.error("Error en /api/reclamos:", err.message)
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      )
    }

    console.error("Error desconocido en /api/reclamos:", err)
    return NextResponse.json(
      { error: "Error desconocido" },
      { status: 500 }
    )
  }
}