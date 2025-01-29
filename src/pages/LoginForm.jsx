import React, { useState } from "react";
import { Login } from "../service/AuthService";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import Footer from "../components/Footer";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Usamos useNavigate para la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage(""); // Limpiar el mensaje de éxito anterior

    try {
      const result = await Login(email, password);

      if (result.success) {
        console.log("Login exitoso:", result.data);
        // Guardar el token en el almacenamiento local
        localStorage.setItem("token", result.data.token);
        setSuccessMessage("Inicio de sesión exitoso. Redirigiendo..."); // Mostrar mensaje de éxito
        // Redirigir al usuario a la página de inicio después de un breve retraso
        setTimeout(() => {
          navigate("/admin-home"); // Redirige a /admin-home
        }, 2000); // Redirige después de 2 segundos
      } else {
        setError(result.error || "Credenciales incorrectas"); // Muestra un mensaje de error
      }
    } catch (error) {
      setError("Error en la conexión con el servidor"); // Muestra un mensaje de error genérico
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="login-container2">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          {error && <p className="error-message">{error}</p>} {/* Muestra el mensaje de error */}
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Muestra el mensaje de éxito */}
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default LoginForm;