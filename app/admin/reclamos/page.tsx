"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Reclamo = {
  id: string
  creado_en: string
  nombre: string
  documento: string
  email: string
  telefono: string
  servicio: string
  tipo: string
  detalle: string
  pedido: string
  respondido?: boolean
  respondido_en?: string
  respuesta?: string
}

export default function ReclamosAdminPage() {
  const [reclamos, setReclamos] = useState<Reclamo[]>([])
  const [loading, setLoading] = useState(true)

  // Estado para modal de respuesta
  const [openRespuesta, setOpenRespuesta] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("")
  const [selectedEmail, setSelectedEmail] = useState("")
  const [asunto, setAsunto] = useState("")
  const [mensaje, setMensaje] = useState("")
  const [sending, setSending] = useState(false)

  // Estado para modal de texto largo (detalle/pedido)
  const [openTexto, setOpenTexto] = useState(false)
  const [textoSeleccionado, setTextoSeleccionado] = useState("")
  const [tituloModal, setTituloModal] = useState("")

  const [toast, setToast] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("reclamos")
        .select("*")
        .order("creado_en", { ascending: false })

      if (error) {
        console.error("❌ Error cargando reclamos:", error)
      } else {
        setReclamos(data as Reclamo[])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleResponder = (id: string, email: string) => {
    setSelectedId(id)
    setSelectedEmail(email)
    setAsunto("")
    setMensaje("")
    setOpenRespuesta(true)
  }

  const enviarRespuesta = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setToast("")

    try {
      const res = await fetch("/api/responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedId,
          to: selectedEmail,
          asunto,
          mensaje,
        }),
      })

      if (!res.ok) throw new Error("Error al enviar la respuesta")

      // 🔹 Refrescar tabla después de responder
      setReclamos((prev) =>
        prev.map((r) =>
          r.id === selectedId ? { ...r, respondido: true, respuesta: mensaje } : r
        )
      )

      setToast("✅ Respuesta enviada con éxito")
      setOpenRespuesta(false)
    } catch (err) {
      console.error(err)
      setToast("❌ Error al enviar la respuesta")
    } finally {
      setSending(false)
      setTimeout(() => setToast(""), 4000)
    }
  }

  if (loading) return <p className="p-6">Cargando reclamos...</p>

  return (
    <section className="container p-6">
      <h1 className="title">Reclamos recibidos</h1>
      {reclamos.length === 0 ? (
        <p>No hay reclamos registrados todavía.</p>
      ) : (
        <table className="reclamos-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Detalle</th>
              <th>Pedido</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reclamos.map((r) => (
              <tr key={r.id}>
                <td>{new Date(r.creado_en).toLocaleString()}</td>
                <td>{r.nombre}</td>
                <td>{r.tipo}</td>
                <td>
                  {r.detalle.length > 10
                    ? r.detalle.slice(0, 10) + "..."
                    : r.detalle}
                  <button
                    className="vermas-btn"
                    onClick={() => {
                      setTituloModal("Detalle del Reclamo")
                      setTextoSeleccionado(r.detalle)
                      setOpenTexto(true)
                    }}
                  >
                    Ver más
                  </button>
                </td>
                <td>
                  {r.pedido.length > 10
                    ? r.pedido.slice(0, 10) + "..."
                    : r.pedido}
                  <button
                    className="vermas-btn"
                    onClick={() => {
                      setTituloModal("Pedido del Reclamo")
                      setTextoSeleccionado(r.pedido)
                      setOpenTexto(true)
                    }}
                  >
                    Ver más
                  </button>
                </td>
                <td className="text-blue-600">{r.email}</td>
                <td>
                  {r.respondido ? (
                    <span className="text-green-600 font-semibold">
                      Respondido
                    </span>
                  ) : (
                    <span className="text-red-600">Pendiente</span>
                  )}
                </td>
                <td>
                  {!r.respondido && (
                    <button
                      className="responder-btn"
                      onClick={() => handleResponder(r.id, r.email)}
                    >
                      Responder
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de Respuesta */}
      {openRespuesta && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Responder a {selectedEmail}</h2>
            <form onSubmit={enviarRespuesta} className="space-y-4">
              <input
                type="text"
                placeholder="Asunto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                required
              />
              <textarea
                placeholder="Escribe tu mensaje..."
                rows={5}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              />
              <div className="modal-actions">
                <button
                  type="button"
                  className="modal-btn-cancel"
                  onClick={() => setOpenRespuesta(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={sending}
                  className="modal-btn-send"
                >
                  {sending ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Texto Largo (detalle/pedido) */}
      {openTexto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{tituloModal}</h2>
            <p className="whitespace-pre-line">{textoSeleccionado}</p>
            <div className="modal-actions">
              <button
                className="modal-btn-cancel"
                onClick={() => setOpenTexto(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <br />
      {toast && (
        <p className="mt-4 text-center text-sm text-gray-700">{toast}</p>
      )}
    </section>
  )
}
