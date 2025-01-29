import React, { useState, useMemo, useCallback } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import UserModal from "../form/UserModal"; // Importar el componente UserModal
import "../../styles/UserTable.css"; // Importamos el archivo CSS

const UserTable = ({ users = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  // Filtrar usuarios
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [users, searchTerm]);

  // Ordenar usuarios
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    });
  }, [filteredUsers, sortField, sortOrder]);

  // Paginación
  const indexOfLastUser = currentPage * rowsPerPage;
  const indexOfFirstUser = indexOfLastUser - rowsPerPage;
  const currentUsers = useMemo(
    () => sortedUsers.slice(indexOfFirstUser, indexOfLastUser),
    [sortedUsers, indexOfFirstUser, indexOfLastUser]
  );

  const handleSortChange = useCallback(
    (field) => {
      if (sortField === field) {
        setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
      } else {
        setSortField(field);
        setSortOrder("asc");
      }
    },
    [sortField]
  );

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  }, []);

  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (newUser) => {
    console.log("Nuevo usuario:", newUser); // Aquí puedes enviar los datos a tu API
    closeModal();
  };

  return (
    <div className="user-table-container">
      <div className="table-header">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar usuarios"
        />

        <div className="rows-per-page">
          {/* Botón para abrir el modal */}
          <button className="add-user-button" onClick={openModal}>
            Registrar Cliente
          </button>

          <span>Filas por página:</span>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            aria-label="Filas por página"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <h2 className="table-title">Lista de Usuarios</h2>

      <div className="table-wrapper">
        <table className="user-table" role="grid">
          <thead>
            <tr>
              <th onClick={() => handleSortChange("_id")} role="columnheader">
                Código{" "}
                {sortField === "_id" &&
                  (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSortChange("name")} role="columnheader">
                Nombre{" "}
                {sortField === "name" &&
                  (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSortChange("email")} role="columnheader">
                Email{" "}
                {sortField === "email" &&
                  (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
              <th onClick={() => handleSortChange("role")} role="columnheader">
                Rol{" "}
                {sortField === "role" &&
                  (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id} role="row">
                <td>{user._id}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
                <td>{user.role || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
          aria-label="Página anterior"
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>

      {/* Modal para registrar un nuevo cliente */}
      <UserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserTable;
