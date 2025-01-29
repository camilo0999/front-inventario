import React, { useState } from "react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiHome,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom"; // Importar para redirigir
import "../styles/MenuSidebar.css"; // Importamos el archivo CSS

const MenuSidebar = () => {
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const navigate = useNavigate(); // Hook para redireccionar

  const toggleInventory = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("auth"); // Eliminar estado de autenticación
    localStorage.removeItem("token"); // Eliminar token de sesión
    navigate("/login"); // Redirigir al login
  };

  return (
    <div className="sidebar">
      <div className="sidebar-items">
        <div className="sidebar-item-group">
          <a href="/admin-home" className="sidebar-item">
            <HiChartPie className="sidebar-icon" />
            <span>Dashboard</span>
          </a>

          <div className="sidebar-collapse">
            <div className="sidebar-collapse-header" onClick={toggleInventory}>
              <HiShoppingBag className="sidebar-icon" />
              <span>Inventario</span>
              <HiArrowSmRight
                className={`collapse-arrow ${isInventoryOpen ? "open" : ""}`}
              />
            </div>
            <div
              className={`sidebar-collapse-content ${
                isInventoryOpen ? "open" : ""
              }`}
            >
              <a href="/admin-product" className="sidebar-item">Productos</a>
              <a href="/admin-shopping" className="sidebar-item">Compras</a>
              <a href="/admin-movements" className="sidebar-item">Movimientos</a>
            </div>
          </div>

          <a href="/" target="_blank" className="sidebar-item">
            <HiHome className="sidebar-icon" />
            <span>Inicio</span>
          </a>

          <a href="#" className="sidebar-item">
            <HiInbox className="sidebar-icon" />
            <span>Mensajes</span>
          </a>

          <a href="/admin-user" className="sidebar-item">
            <HiUser className="sidebar-icon" />
            <span>Clientes</span>
          </a>

          {/* Botón de Cerrar Sesión */}
          <button onClick={handleLogout} className="sidebar-item logout">
            <HiTable className="sidebar-icon" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuSidebar;
