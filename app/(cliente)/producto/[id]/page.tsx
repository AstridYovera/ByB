"use client"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { MessageCircle, ArrowLeft } from "lucide-react"
import { useState } from "react"
import productos from "@/app/data/productos.json"

export default function ProductoPage() {
  const { id } = useParams()
  const producto = productos.find((p) => p.id === id)
  const [imagenActiva, setImagenActiva] = useState(producto?.imagenes[0] || "")
  const [tallaSeleccionada, setTallaSeleccionada] = useState("")
  const [colorSeleccionado, setColorSeleccionado] = useState("")
  const [error, setError] = useState("")

  if (!producto) {
    return (
      <div className="container" style={{ padding: "4rem", textAlign: "center" }}>
        <h1>Producto no encontrado</h1>
        <Link href="/catalogo" className="btn btn-secondary" style={{ marginTop: "1rem" }}>
          Volver al Catálogo
        </Link>
      </div>
    )
  }

  const mensajeWhatsApp = `Hola, quiero comprar el ${producto.nombre}${tallaSeleccionada ? ` en talla ${tallaSeleccionada}` : ""
    }${colorSeleccionado ? ` en color ${colorSeleccionado}` : ""}`

  const handleComprar = () => {
    if (producto.tallas.length > 0 && !tallaSeleccionada) {
      setError("Por favor selecciona una talla.")
      return
    }
    if (producto.colores.length > 0 && !colorSeleccionado) {
      setError("Por favor selecciona un color.")
      return
    }
    setError("")
    window.open(`https://wa.me/+51970588571?text=${encodeURIComponent(mensajeWhatsApp)}`, "_blank")
  }

  return (
    <section className="producto-detalle container">
      <Link href="/catalogo" className="volver">
        <ArrowLeft size={18} /> Volver al catálogo
      </Link>

      <div className="producto-grid">
        {/* Galería */}
        <div className="galeria">
          <Image
            src={imagenActiva}
            alt={producto.nombre}
            width={600}
            height={600}
            className="imagen-principal"
          />
          <div className="miniaturas">
            {producto.imagenes.map((img, i) => (
              <Image
                key={i}
                src={img}
                alt={`${producto.nombre} ${i + 1}`}
                width={120}
                height={120}
                className={`miniatura ${img === imagenActiva ? "activa" : ""}`}
                onClick={() => setImagenActiva(img)}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="producto-info">
          <h1>{producto.nombre}</h1>
          <p className="precio">{producto.precio}</p>
          <p className="descripcion">{producto.descripcion}</p>

          {producto.tallas.length > 0 && (
            <div className="tallas">
              <h4>Selecciona tu talla:</h4>
              <div className="tallas-opciones">
                {producto.tallas.map((t) => (
                  <button
                    key={t}
                    className={`talla-btn ${tallaSeleccionada === t ? "activa" : ""}`}
                    onClick={() => setTallaSeleccionada(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {producto.colores.length > 0 && (
            <div className="colores">
              <h4>Selecciona color:</h4>
              <div className="colores-opciones">
                {producto.colores.map((c) => (
                  <button
                    key={c.nombre}
                    className={`color-circulo ${colorSeleccionado === c.nombre ? "activo" : ""}`}
                    style={{ backgroundColor: c.codigo }}
                    title={c.nombre}
                    onClick={() => setColorSeleccionado(c.nombre)}
                  />
                ))}
              </div>
              {colorSeleccionado && <p className="seleccion">Color seleccionado: {colorSeleccionado}</p>}
            </div>
          )}


          {error && <p className="error-msg">{error}</p>}

          <button onClick={handleComprar} className="btn btn-primary whatsapp-btn">
            <MessageCircle className="icon" />
            Comprar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}
