import React, { useState, useEffect } from "react";
import "../styles/AdminShopping.css"; // Import styles
import MenuSidebar from "../components/MenuSidebar";
import MovementsTable from "../components/tables/MovementsTable.jsx"; // Import table component
import { GetAllMovements } from "../service/MovementsService"; // Import service to get movements

const AdminMovements = () => {
  const [movements, setMovements] = useState([]); // Inicializar como array vacío
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [itemsPerPage, setItemsPerPage] = useState(10); // Estado para el número de elementos por página
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga de datos

  // Función para cargar los movimientos desde el servicio
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        const data = await GetAllMovements(); // Llama al servicio para obtener los movimientos
        if (Array.isArray(data)) {
          setMovements(data); // Actualiza el estado con los datos recibidos
          console.log("Movimientos cargados:", movements);
        } else {
          console.error("Los datos recibidos no son un array:", data);
          setMovements([]); // Si no es un array, inicializa como array vacío
        }
      } catch (error) {
        console.error("Error al cargar los movimientos:", error);
        setMovements([]); // En caso de error, inicializa como array vacío
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetchMovements();
  }, []);

  // Función para manejar el cambio en el término de búsqueda
  const onSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reinicia la página a la primera cuando se realiza una búsqueda
  };

  // Función para manejar el cambio en el número de elementos por página
  const onItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reinicia la página a la primera cuando se cambia el número de elementos por página
  };

  // Filtra los movimientos basados en el término de búsqueda
  const filteredMovements = movements.filter(
    (movement) =>
      movement.Products.toLowerCase().includes(searchTerm.toLowerCase()) || // Buscar en el ID del producto
      movement.type.toLowerCase().includes(searchTerm.toLowerCase()) || // Buscar en el tipo de movimiento
      movement.quantity.toString().includes(searchTerm) || // Buscar en la cantidad
      new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" })
        .format(new Date(movement.date)) // Formatear la fecha correctamente
        .includes(searchTerm)
  );

  // Calcula el número total de páginas
  const totalPages = Math.ceil(filteredMovements.length / itemsPerPage);

  // Obtiene los movimientos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMovements.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar de página
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Mostrar un mensaje de carga mientras se obtienen los datos
  if (isLoading) {
    return <div>Cargando movimientos...</div>;
  }

  return (
    <div className="admin-shopping">
      {/* Sidebar */}
      <MenuSidebar />

      {/* Main content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <h1>Administración de Movimientos</h1>
        </div>

        {/* Content */}
        <div className="content">
          {/* Welcome text */}
          <p className="welcome-text">
            Bienvenido a la administración de movimientos. Aquí puedes gestionar todos los movimientos registrados.
          </p>

          {/* Summary cards */}
          <div className="cards-container">
            <div className="card blue-card">
              <h3>Total Movimientos</h3>
              <p>{movements.length}</p>
            </div>
            <div className="card green-card">
              <h3>Entradas</h3>
              <p>
                {movements.filter((movement) => movement.type === "entrada").length}
              </p>
            </div>
            <div className="card yellow-card">
              <h3>Salidas</h3>
              <p>
                {movements.filter((movement) => movement.type === "salida").length}
              </p>
            </div>
          </div>

          {/* Movements table */}
          <MovementsTable
            movements={currentItems} // Pasa los movimientos filtrados y paginados
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminMovements;