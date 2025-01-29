import React, { useState, useEffect } from "react";
import "../styles/AdminHome.css"; // Importamos el archivo CSS
import MenuSidebar from "../components/MenuSidebar";
import UserTable from "../components/tables/UserTable";
import { GetAllUsers } from "../service/UserService";

const AdminUser = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Efecto para obtener los usuarios al cargar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetAllUsers(); // Consumir el servicio
        setUsers(response.data); // Actualizar el estado con los usuarios
      } catch (err) {
        setError(err.message); // Manejar errores
      } finally {
        setLoading(false); // Finalizar la carga
      }
    };

    fetchUsers();
  }, []); // El array vacío asegura que solo se ejecute una vez

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  // Mostrar un mensaje de error si algo sale mal
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-home">
      {/* Sidebar fija a la izquierda */}
      <MenuSidebar />

      {/* Contenido principal */}
      <div className="main-content">
        {/* Cabecera fija */}
        <header className="header">
          <h1>Dashboard de Administrador</h1>
        </header>

        {/* Contenido con padding para no quedar tapado por la cabecera */}
        <main className="content">
          <p className="welcome-text">
            Bienvenido al panel de administración, aquí puedes gestionar usuarios y más.
          </p>

          {/* Tarjetas de resumen */}
          <div className="cards-container">
            <div className="card blue-card">
              <h3>Usuarios Activos</h3>
              <p>{users.filter((user) => user.status === "Active").length}</p>
            </div>
            <div className="card green-card">
              <h3>Usuarios Inactivos</h3>
              <p>{users.filter((user) => user.status === "Inactive").length}</p>
            </div>
            <div className="card yellow-card">
              <h3>Total de Usuarios</h3>
              <p>{users.length}</p>
            </div>
          </div>

          {/* Usamos el componente UserTable */}
          <div className="user-table-container">
            <UserTable users={users} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUser;