import React, { useState, useEffect } from "react";
import "../styles/AdminShopping.css";
import MenuSidebar from "../components/MenuSidebar";
import ShoppingTable from "../components/tables/ShoppingTable";
import { getAllPurchases } from "../service/ShoppingService";
import { DownloadFacture } from "../service/FactureService";

const AdminShopping = () => {
  const [shoppingData, setShoppingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPurchases = async () => {
    try {
      const response = await getAllPurchases();
      if (response.success) {
        setShoppingData(response.data);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError("Error al cargar las compras");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPurchases();
  }, []);

  const handleExportInvoice = async (id) => {
    try {
        const response = await DownloadFacture(id);

        if (response.success) {
            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(response.data); // Usar el Blob directamente
            const link = document.createElement('a');
            link.href = url;
            link.download = `factura_${id}.pdf`; // Nombre del archivo
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Limpiar el enlace temporal
            window.URL.revokeObjectURL(url); // Liberar el objeto URL
        } else {
            setError("Error al descargar la factura: " + response.error);
        }
    } catch (error) {
        setError("Error al descargar la factura: " + error.message);
        console.error("Detalles del error:", error); // Registrar el error en la consola
    }
};

  if (loading) {
    return <div>Cargando compras...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calcular los totales
  const totalPurchases = shoppingData.length;
  const totalRevenue = shoppingData.reduce(
    (sum, purchase) => sum + (purchase.total || 0),
    0
  );
  const totalProductsSold = shoppingData.reduce(
    (sum, purchase) =>
      sum +
      purchase.products.reduce(
        (productSum, product) => productSum + (product.quantity || 0),
        0
      ),
    0
  );

  return (
    <div className="admin-shopping">
      <MenuSidebar className="fixed-sidebar" />
      <div className="main-content">
        <header className="header">
          <h1>Dashboard de Administrador</h1>
        </header>
        <main className="content">
          <p className="welcome-text">
            Bienvenido al panel de administración, aquí puedes gestionar las
            compras y más.
          </p>
          <div className="cards-container">
            <div className="card blue-card">
              <h3>Compras Totales</h3>
              <p>{totalPurchases}</p>
            </div>
            <div className="card green-card">
              <h3>Ingresos Totales</h3>
              <p>${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="card yellow-card">
              <h3>Productos Vendidos</h3>
              <p>{totalProductsSold}</p>
            </div>
          </div>
          <div className="shopping-table-container">
            <h2>Lista de Compras</h2>
            <ShoppingTable
              shoppingData={shoppingData}
              setShoppingData={setShoppingData}
              onGeneratePurchase={() => {}}
              onExportInvoice={handleExportInvoice} // Pasa la función de descarga de factura
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminShopping;