import React from "react";
import MenuSidebar from "../components/MenuSidebar";

const AdminHome = () => {
  return (
    <div>
      <MenuSidebar />
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Administración de Movimientos</h1>
        </div>
        <div className="content">
          {/* Welcome text */}
          <p className="welcome-text">
            Bienvenido al panel de administración. Desde aquí puedes gestionar
            los diferentes módulos del sistema.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
