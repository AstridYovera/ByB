"use client"
import { useState } from "react"
import emailjs from "@emailjs/browser"
import { Mail, Phone, MessageCircle, Loader2, CheckCircle, XCircle } from "lucide-react"

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  })

  const [toast, setToast] = useState<{ mensaje: string; tipo: "info" | "success" | "error" | null }>({
    mensaje: "",
    tipo: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setToast({ mensaje: "Enviando...", tipo: "info" })

    try {
      // 👉 1. Correo para ti
      await emailjs.send(
        "service_bnlsnrf",
        "template_0jfbruj",
        {
          nombre: form.nombre,
          email: form.email,
          mensaje: form.mensaje,
        },
        "7MZ1I4mYwdfdsVcrf"
      )

      // 👉 2. Auto-respuesta al cliente
      await emailjs.send(
        "service_bnlsnrf",
        "template_i856tir",
        {
          nombre: form.nombre,
          email: form.email,
        },
        "7MZ1I4mYwdfdsVcrf"
      )

      setToast({ mensaje: "Mensaje enviado con éxito", tipo: "success" })
      setForm({ nombre: "", email: "", mensaje: "" })
    } catch (error: unknown) {
      setToast({ mensaje: "Error al enviar. Inténtalo otra vez.", tipo: "error" })
    }

    // Cerrar automáticamente el toast después de 4s
    setTimeout(() => setToast({ mensaje: "", tipo: null }), 4000)
  }

  return (
    <section className="contacto container">
      {/* Hero */}
      <div className="contacto-hero">
        <h1>Contáctanos</h1>
        <p>Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.</p>
      </div>

      <div className="contacto-grid">
        {/* Información de contacto */}
        <div className="contacto-info">
          <h2>Información</h2>
          <p>Puedes comunicarte con nosotros a través de:</p>
          <ul>
            <li>
              <MessageCircle className="icon" />
              <a href="https://wa.me/51970588571" target="_blank">WhatsApp</a>
            </li>
            <li>
              <Phone className="icon" />
              <a href="tel:+51970588571">+51 970 588 571</a>
            </li>
            <li>
              <Mail className="icon" />
              <a href="mailto:byb.contacto.oficial@gmail.com">byb.contacto.oficial@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Formulario */}
        <form className="contacto-form" onSubmit={handleSubmit}>
          <h2>Envíanos un mensaje</h2>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              rows={5}
              placeholder="Escribe tu mensaje..."
              value={form.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>

      {/* Toast */}
      {toast.tipo && (
        <div className={`toast ${toast.tipo}`}>
          {toast.tipo === "info" && <Loader2 className="icon spin" />}
          {toast.tipo === "success" && <CheckCircle className="icon" />}
          {toast.tipo === "error" && <XCircle className="icon" />}
          <span>{toast.mensaje}</span>
        </div>
      )}
    </section>
  )
}
