import Link from "next/link"

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Donde la moda se encuentra <br /> con la <span className="highlight">comodidad</span>
            </h1>
            <p>
              Blazers para brillar en cualquier ocasión. <br />
              Buzos para los pequeños con estilo. <br />
              <strong>B&B</strong>, tu nueva forma de vestir con confianza.
            </p>

            <div className="hero-buttons">
              <Link href="/catalogo" className="btn btn-catalogo">
                Ver Catálogo
              </Link>
              <Link href="/nosotros" className="btn btn-secondary">
                Conócenos
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="./img/banner.jpg"
              alt="Colección BYB"
            />
          </div>
        </div>
      </section>

      {/* Colecciones Destacadas */}
      <section className="collections container">
        <h2>Colecciones Destacadas</h2>
        <div className="collections-grid">
          <div className="card">
            <img src="./img/banner.jpg" alt="Blazers" />
            <div className="card-body">
              <h3>Blazers</h3>
              <p>Diseñados para brillar en cualquier ocasión.</p>
              <Link href="/catalogo" className="btn btn-secondary">
                Ver más
              </Link>
            </div>
          </div>

          <div className="card">
            <img src="./img/banner.jpg" alt="Buzos" />
            <div className="card-body">
              <h3>Buzos</h3>
              <p>Comodidad y estilo para los más pequeños.</p>
              <Link href="/catalogo" className="btn btn-secondary">
                Ver más
              </Link>
            </div>
          </div>

          <div className="card">
            <img src="./img/banner.jpg" alt="Accesorios" />
            <div className="card-body">
              <h3>Accesorios</h3>
              <p>Detalles únicos que completan tu look.</p>
              <Link href="/catalogo" className="btn btn-secondary">
                Ver más
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook */}
      <section className="lookbook container">
        <h2>Lookbook</h2>
        <p className="lookbook-subtitle">
          Inspiración en cada detalle. Descubre cómo combinar nuestras prendas.
        </p>

        <div className="lookbook-grid">
          <div className="lookbook-item tall">
            <img src="./img/banner.jpg" alt="Look elegante" />
          </div>
          <div className="lookbook-item">
            <img src="./img/banner.jpg" alt="Casual moderno" />
          </div>
          <div className="lookbook-item">
            <img src="./img/banner.jpg" alt="Streetwear con estilo" />
          </div>
          <div className="lookbook-item wide">
            <img src="./img/banner.jpg" alt="Blazers colección" />
          </div>
        </div>
      </section>
      <br />
    </main>
  )
}
