import "../globals.css"
import Link from "next/link"

export default function ClienteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <Link href="">
            <img src="/img/logo.png" alt="Logo BYB" width={60} height={60} />
          </Link>
          <nav className="menu">
            <Link href="/">Inicio</Link>
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
        </div>
      </header>

      {/* Contenido de cada página */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          {/* Logo + descripción */}
          <div className="footer-logo">
            <Link href="">
              <img src="/img/logo-footer.png" alt="Logo BYB" width={90} height={80} />
            </Link>
            <p>Moda con esencia, estilo y autenticidad.</p>
          </div>

          {/* Enlaces */}
          <div className="footer-links">
            <h3>Enlaces</h3>
            <ul>
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/catalogo">Catálogo</Link></li>
              <li><Link href="/nosotros">Nosotros</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="footer-contact">
            <h3>Contáctanos</h3>
            <p>Lima, Perú</p>
            <p>byb.contacto.oficial@gmail.com</p>
            <p>+51 970 588 571</p>
          </div>
          
          {/* Botón Libro de Reclamaciones */}
          <div className="footer-libro">
            <a href="/libro-reclamaciones" target="_blank" rel="noopener noreferrer">
              <img src="/img/libro-de-reclamaciones.png" alt="Libro de Reclamaciones" />
            </a>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="footer-bottom">
          <p>© 2025 B&B. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}

