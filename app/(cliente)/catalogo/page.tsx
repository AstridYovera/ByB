"use client"
import { useState } from "react"
import Link from "next/link"
import productos from "@/app/data/productos.json"

// Importar Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export default function CatalogoPage() {
  const [categoria, setCategoria] = useState("Todos")
  const [busqueda, setBusqueda] = useState("")

  const categorias = ["Todos", "Blazers", "Buzos", "Accesorios"]

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = categoria === "Todos" || p.categoria === categoria
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  // Productos destacados (primeros 5 productos)

  const destacados = productos.slice(0, 5)

  return (
    <section className="catalogo container">
      <h1>Catálogo</h1>
      <p className="catalogo-subtitle">Explora nuestra colección exclusiva</p>

      {/* SLIDER DESTACADOS */}
      <div className="destacados">
        <h2>Destacados de la semana</h2> <br />
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
        >
          {destacados.map((prod) => (
            <SwiperSlide key={prod.id}>
              <div className="card">
                <img src={prod.imagenes[0]} alt={prod.nombre} />
                <div className="card-body">
                  <h3>{prod.nombre}</h3>
                  <span className="price">{prod.precio}</span>
                  <Link href={`/producto/${prod.id}`} className="btn">
                    Ver más
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* BUSCADOR */}
      <div className="destacados">
        <h2>Nuestros Productos</h2>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* FILTROS */}
      <div className="filtros">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`filtro-btn ${categoria === cat ? "activo" : ""}`}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="catalogo-grid">
        {productosFiltrados.map((prod) => (
          <div key={prod.id} className="card">
            <img src={prod.imagenes[0]} alt={prod.nombre} />
            <div className="card-body">
              <h3>{prod.nombre}</h3>
              <p>{prod.descripcion}</p>
              <span className="price">{prod.precio}</span>
              <Link href={`/producto/${prod.id}`} className="btn">
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
