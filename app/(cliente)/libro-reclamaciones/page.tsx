"use client"
import { useState } from "react"
import { Loader2, CheckCircle, XCircle } from "lucide-react"

export default function LibroReclamacionesPage() {
    const [form, setForm] = useState({
        nombre: "",
        documento: "",
        email: "",
        telefono: "",
        servicio: "",
        tipo: "",
        detalle: "",
        pedido: "",
    })

    const [toast, setToast] = useState<{ mensaje: string; tipo: "info" | "success" | "error" | null }>({
        mensaje: "",
        tipo: null,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setToast({ mensaje: "Enviando...", tipo: "info" })

        try {
            // 👉 Mandar datos al backend (API route en /api/reclamos)
            const res = await fetch("./api/reclamo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            })

            if (!res.ok) throw new Error("Error al enviar")

            setToast({ mensaje: "Reclamo enviado con éxito", tipo: "success" })
            setForm({
                nombre: "",
                documento: "",
                email: "",
                telefono: "",
                servicio: "",
                tipo: "",
                detalle: "",
                pedido: "",
            })
        } catch (err) {
            console.error(err)
            setToast({ mensaje: "Error al enviar. Inténtalo de nuevo.", tipo: "error" })
        }

        // Cerrar toast en 4s
        setTimeout(() => setToast({ mensaje: "", tipo: null }), 4000)
    }

    return (
        <section className="contacto container">
            {/* Hero */}
            <div className="contacto-hero">
                <h1>Libro de Reclamaciones</h1>
                <p>Conforme a la Ley N° 29571 - Código de Protección y Defensa del Consumidor</p>
            </div>

            <form className="contacto-form" onSubmit={handleSubmit}>
                <h2>Datos del Consumidor</h2>

                <div className="form-group">
                    <label htmlFor="nombre">Nombres y Apellidos</label>
                    <input id="nombre" type="text" value={form.nombre} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="documento">DNI / CE / Pasaporte</label>
                    <input id="documento" type="text" value={form.documento} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" type="email" value={form.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input id="telefono" type="tel" value={form.telefono} onChange={handleChange} required />
                </div>

                <h2>Bien o Servicio Contratado</h2>
                <div className="form-group">
                    <textarea id="servicio" rows={3} placeholder="Describa el bien o servicio contratado..." value={form.servicio} onChange={handleChange} required />
                </div>

                <h2>Tipo de Registro</h2>
                <div className="form-group">
                    <select
                        id="tipo"
                        value={form.tipo}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg cursor-pointer"
                        required
                    >
                        <option value="" disabled>Seleccione una opción</option>
                        <option value="Reclamo">Reclamo</option>
                        <option value="Queja">Queja</option>
                    </select>
                </div>

                <h2>Detalle</h2>
                <div className="form-group">
                    <textarea id="detalle" rows={4} placeholder="Describa el reclamo o queja..." value={form.detalle} onChange={handleChange} required />
                </div>

                <h2>Pedido del Consumidor</h2>
                <div className="form-group">
                    <textarea id="pedido" rows={3} placeholder="Indique lo que solicita como consumidor..." value={form.pedido} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary">Enviar Reclamo</button>
            </form>

                        <br/>
                        
            {/* Nota legal */}
            <p className="text-sm mt-6 text-gray-500">
                La empresa deberá dar respuesta en un plazo máximo de 30 días calendario, pudiendo ampliar el plazo previa comunicación al consumidor.
            </p>

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
