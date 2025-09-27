import { Sparkles, Leaf, Handshake, Target, Eye } from "lucide-react"

export default function NosotrosPage() {
    return (
        <section className="nosotros">
            {/* Hero */}
            <div className="nosotros-hero container">
                <div className="hero-texto">
                    <h1>Nuestra Historia</h1>
                    <p>
                        Una historia de esfuerzo, resiliencia y sueños.
                        Así nació <span className="marca">B&B</span>.
                    </p>
                </div>
                <div className="hero-imagen">
                    <img src="/banner-nosotros.jpg" alt="Moda B&B" />
                </div>
            </div>

            {/* Historia */}
            <div className="container historia">
                <h2>De un sueño familiar a una marca de moda</h2>
                <p>
                    Somos una familia que empezó desde abajo. Primero trabajando como dependientes en el rubro textil,
                    hasta que con esfuerzo logramos comprar nuestras primeras máquinas de costura para emprender poco a poco.
                </p>
                <p>
                    Durante un tiempo trabajamos dando servicio de costura para una empresa en Gamarra,
                    y aunque significó mucho aprendizaje, siempre tuvimos el deseo de construir algo nuestro.
                </p>
                <p>
                    En la pandemia perdimos ese trabajo y tuvimos que reinventarnos: comenzamos vendiendo mascarillas de tela
                    e impermeables, luego nos lanzamos como vendedores ambulantes. Fue duro, pero también la mayor motivación:
                    vendimos todo y nos dimos cuenta de que queríamos ser independientes.
                </p>
                <p>
                    Con el tiempo, volvimos a trabajar en Gamarra, pero sin dejar de lado nuestro espíritu emprendedor.
                    Hoy seguimos en ambos caminos: trabajando y al mismo tiempo levantando <span className="marca">B&B</span>,
                    con la visión de expandirnos y crecer en el mundo online.
                </p>
            </div>

            {/* Historia con timeline estilizado */}
            <section className="timeline">
                <h2 className="timeline-title">Nuestra Historia</h2>
                <div className="timeline-container">
                    <div className="timeline-item">
                        <div className="circle">1</div>
                        <h3>Inicios</h3>
                        <p>Trabajamos como dependientes en talleres de costura, aprendiendo el oficio.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="circle">2</div>
                        <h3>Primeras Máquinas</h3>
                        <p>Con sacrificio compramos nuestras primeras máquinas de coser para emprender.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="circle">3</div>
                        <h3>Gamarra</h3>
                        <p>Prestamos servicios de costura en una empresa, ganando experiencia y disciplina.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="circle">4</div>
                        <h3>Pandemia</h3>
                        <p>Perdimos el trabajo, pero nos reinventamos vendiendo mascarillas y ropa.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="circle">5</div>
                        <h3>Ventas en la calle</h3>
                        <p>Nos lanzamos como vendedores ambulantes, creciendo paso a paso.</p>
                    </div>
                    <div className="timeline-item">
                        <div className="circle">6</div>
                        <h3>Nace B&B</h3>
                        <p>De toda esa experiencia surge <strong>B&B</strong>, con la visión de crecer en el mundo online.</p>
                    </div>
                </div>
            </section>

            {/* Misión, Visión y Valores */}
            <div className="container mvv">
                <div className="card-mvv">
                    <Target className="icon" />
                    <h3>Misión</h3>
                    <p>
                        Diseñar y ofrecer moda minimalista y moderna, accesible para todos,
                        que combine estilo, comodidad y calidad.
                    </p>
                </div>
                <div className="card-mvv">
                    <Eye className="icon" />
                    <h3>Visión</h3>
                    <p>
                        Ser reconocidos como una marca de referencia en moda peruana, expandiéndonos al mundo online
                        y llegando a cada rincón con autenticidad y pasión.
                    </p>
                </div>
                <div className="card-mvv">
                    <Sparkles className="icon" />
                    <h3>Valores</h3>
                    <ul>
                        <li><Leaf className="icon" /> Perseverancia y resiliencia</li>
                        <li><Handshake className="icon" /> Cercanía con nuestros clientes</li>
                        <li><Sparkles className="icon" /> Innovación y estilo único</li>
                    </ul>
                </div>
            </div>

            {/* Imagen final */}
            <div className="nosotros-final">
                <img src="/nosotros.jpg" alt="Equipo B&B trabajando" />
            </div>
        </section>
    )
}
