import React, { useState, useEffect } from "react";
import "../styles/AdminProduct.css";
import MenuSidebar from "../components/MenuSidebar";
import ProductTable from "../components/tables/ProductTable";
import { GetAllProducts } from "../service/ProductService";

const AdminProduct = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState("");

  // Obtener los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      const result = await GetAllProducts(); // Llamar a la función para obtener productos

      if (result.success) {
        setProducts(result.data); // Actualizar el estado con los productos obtenidos
      } else {
        setError(result.error); // Mostrar el mensaje de error
      }
      setLoading(false); // Desactivar el estado de carga
    };

    fetchProducts();
  }, []);

  // Mostrar un mensaje de carga
  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  // Mostrar un mensaje de error
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-product">
      {/* Sidebar fija a la izquierda */}
      <MenuSidebar className="fixed-sidebar" />

      {/* Contenido principal */}
      <div className="main-content">
        {/* Cabecera fija */}
        <header className="header">
          <h1>Dashboard de Administrador</h1>
        </header>

        {/* Contenido con padding para no quedar tapado por la cabecera */}
        <main className="content">
          <p className="welcome-text">
            Bienvenido al panel de administración, aquí puedes gestionar productos y más.
          </p>

          {/* Tarjetas de resumen de productos */}
          <div className="cards-container">
            <div className="card blue-card">
              <h3>Productos en Stock</h3>
              <p>{products.filter((product) => product.stock > 0).length}</p>
            </div>
            <div className="card green-card">
              <h3>Productos Activos</h3>
              <p>{products.filter((product) => product.price !== "").length}</p>
            </div>
            <div className="card yellow-card">
              <h3>Total de Productos</h3>
              <p>{products.length}</p>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="product-table-container">
            <ProductTable products={products} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminProduct;