import React, { useState, useMemo } from "react";
import ConfirmModal from "../form/ConfirmMondal"; // Asegúrate de que el nombre del componente sea correcto
import { deletePurchase } from "../../service/ShoppingService"; // Importa el servicio

const ShoppingTable = ({
  shoppingData,
  onGeneratePurchase,
  onExportInvoice,
  setShoppingData, // Nueva prop para actualizar el estado de shoppingData
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Función para manejar el cambio de selección
  const handleActionChange = async (id, action) => {
    setError(null); // Limpiar errores previos
    switch (action) {
      case "delete":
        setItemToDelete(id); // Guardar el id del elemento a eliminar
        setIsModalOpen(true); // Abrir el modal de confirmación
        break;
      case "export":
        onExportInvoice(id);
        break;
      default:
        break;
    }
  };

 
  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deletePurchase(itemToDelete); 
        
        setShoppingData((prevData) =>
          prevData.filter((item) => item._id !== itemToDelete)
        );
        setIsModalOpen(false); 
        setItemToDelete(null); 
      } catch (err) {
        setError("Error al eliminar el elemento"); 
        setIsModalOpen(false); 
      }
    }
  };

  // Función para cancelar la eliminación
  const handleCancelDelete = () => {
    setIsModalOpen(false); // Cierra el modal
    setItemToDelete(null); // Limpia el id guardado
  };

  // Filtrar datos basados en el término de búsqueda
  const filteredData = useMemo(() => {
    return shoppingData.filter(
      (item) =>
        item._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.total.toString().includes(searchTerm) ||
        new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" })
          .format(new Date(item.date))
          .includes(searchTerm)
    );
  }, [shoppingData, searchTerm]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Obtener los datos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Función para formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? "Fecha inválida"
      : new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" }).format(date);
  };

  return (
    <div className="shopping-table-container">
      {error && <div className="error-message">{error}</div>}

      {/* Modal de confirmación */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="¿Estás seguro de que deseas eliminar este elemento?"
      />

      <div className="table-header">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div className="header-actions">
          {/* Botón de Generar Compra */}
          <a
            href="/generate-purchase"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="generate-purchase-button">Generar Compra</button>
          </a>
        </div>

        <div className="rows-per-page">
          {/* Select para controlar el número de registros por página */}
          <span>Filas por página:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Resetear a la primera página al cambiar el número de items por página
            }}
            className="items-per-page-select"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Tabla de compras */}
      <table className="shopping-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.status}</td>
              <td>${item.total.toFixed(2)}</td>
              <td>{formatDate(item.date)}</td>
              <td>
                <select
                  className="action-select"
                  onChange={(e) => handleActionChange(item._id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  <option value="delete">Eliminar</option>
                  <option value="export">Exportar Factura</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          aria-disabled={currentPage === 1}
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
          aria-disabled={currentPage === totalPages}
          className="pagination-button"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ShoppingTable;