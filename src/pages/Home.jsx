import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />

      {/* Banner */}
      <div className="banner">
        <div className="banner-content">
          <h1>Bienvenido a InventarioApp</h1>
          <p>Gestiona tu inventario de manera eficiente y sencilla.</p>
          <div className="button-container">
            <button className="banner-button">Comenzar</button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="features-section">
        <h2>Nuestras Funcionalidades</h2>
        <div className="features">
          <div className="feature">
            <h3>Administración de Inventario</h3>
            <p>Administra tus productos de manera eficiente y sencilla.</p>
          </div>
          <div className="feature">
            <h3>Control de Stock</h3>
            <p>Controla el stock de tus productos en tiempo real.</p>
          </div>
          <div className="feature">
            <h3>Reportes y Estadísticas</h3>
            <p>Genera reportes y estadísticas sobre tus ventas e inventario.</p>
          </div>
          <div className="feature">
            <h3>Notificaciones y Alertas</h3>
            <p>Recibe notificaciones y alertas sobre tus productos y ventas.</p>
          </div>
          <div className="feature">
            <h3>Integraciones con otras plataformas</h3>
            <p>
              Integra InventarioApp con otras plataformas para un uso eficiente.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h2>Lo que dicen nuestros usuarios</h2>
        <div className="testimonial">
          <p>
            "InventarioApp ha transformado la forma en que gestionamos nuestro
            negocio. ¡Muy recomendable!"
          </p>
          <span>- Juan Pérez, empresario</span>
        </div>
        <div className="testimonial">
          <p>
            "La mejor herramienta para administrar mi tienda online. Fácil de
            usar y con excelentes funciones."
          </p>
          <span>- María López, dueña de tienda</span>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq">
        <h2>Preguntas Frecuentes</h2>
        <div className="question">
          <h4>¿Es seguro usar InventarioApp?</h4>
          <p>
            Sí, tus datos están protegidos con los más altos estándares de
            seguridad.
          </p>
        </div>
        <div className="question">
          <h4>¿Puedo usarlo desde el móvil?</h4>
          <p>
            Sí, InventarioApp es completamente responsive y funciona en
            cualquier dispositivo.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact">
        <h2>Contáctanos</h2>
        <form>
          <input type="text" placeholder="Nombre" required />
          <input type="email" placeholder="Correo Electrónico" required />
          <textarea placeholder="Tu mensaje" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
