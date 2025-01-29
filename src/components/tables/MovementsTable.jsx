import React, { useState } from "react";

const MovementsTable = ({
  movements,
  searchTerm,
  onSearchChange,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [movementType, setMovementType] = useState("all"); // Estado para el tipo de movimiento

  // Función para manejar el cambio en el tipo de movimiento
  const onMovementTypeChange = (event) => {
    setMovementType(event.target.value);
  };

  // Filtrar movimientos basados en el término de búsqueda y el tipo de movimiento
  const filteredMovements = movements.filter((movement) => {
    const matchesSearchTerm =
      movement.Products.toLowerCase().includes(searchTerm.toLowerCase()); // Buscar en el ID del producto

    const matchesMovementType =
      movementType === "all" || movement.type === movementType; // Filtrar por tipo de movimiento

    return matchesSearchTerm && matchesMovementType;
  });

  // Obtener los movimientos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovements = filteredMovements.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="shopping-table-container">
      <div className="table-header">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por producto..."
          value={searchTerm}
          onChange={onSearchChange}
          className="search-input"
        />

        {/* Selector para el tipo de movimiento */}
        <div className="movement-type-filter">
          <span>Filtrar por tipo:</span>
          <select
            value={movementType}
            onChange={onMovementTypeChange}
            className="movement-type-select"
          >
            <option value="all">Todos</option>
            <option value="entrada">Entradas</option>
            <option value="salida">Salidas</option>
          </select>
        </div>

        {/* Select para controlar el número de registros por página */}
        <div className="rows-per-page">
          <span>Filas por página:</span>
          <select
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            className="items-per-page-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Tabla de movimientos */}
      <table className="shopping-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Compra</th>
          </tr>
        </thead>
        <tbody>
          {currentMovements.map((movement) => (
            <tr key={movement._id}>
              <td>{movement.Products}</td> {/* ID del producto */}
              <td>{movement.type}</td> {/* Tipo de movimiento */}
              <td>{movement.quantity}</td> {/* Cantidad */}
              <td>
                {new Intl.DateTimeFormat("es-ES", {
                  dateStyle: "medium",
                }).format(new Date(movement.date))} {/* Fecha formateada */}
              </td>
              <td>{movement.Shopping}</td> {/* ID de la compra */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
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
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default MovementsTable;