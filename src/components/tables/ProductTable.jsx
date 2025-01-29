import React, { useState, useMemo, useCallback } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import ProductFormModal from "../form/ProductFormModal";
import UpdateProductFormModal from "../form/UpdateProductFormModal";
import { DeleteProduct } from "../../service/ProductService";
import "../../styles/ProductTable.css";
import ConfirmModal from "../form/ConfirmMondal";
import CardModal from "../form/CardModal";

const ProductTable = ({
  products: initialProducts = [],
  columns = {
    _id: "Código",
    name: "Nombre",
    price: "Precio",
    category: "Categoría",
    stock: "Stock",
  },
}) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false); // Nuevo estado para CardModal

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { ...newProduct, _id: Date.now() },
    ]);
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
    setIsUpdateModalOpen(false);
  };

  const handleDeleteProduct = useCallback(async (productId) => {
    try {
      await DeleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }, []);

  const handleActionChange = (event, product) => {
    const action = event.target.value;

    switch (action) {
      case "ver":
        setSelectedProduct(product);
        setIsCardModalOpen(true); // Abre la modal de detalles
        break;
      case "editar":
        setSelectedProduct(product);
        setIsUpdateModalOpen(true);
        break;
      case "eliminar":
        setProductToDelete(product);
        setIsConfirmModalOpen(true);
        break;
      default:
        break;
    }
    event.target.value = ""; // Reset the select dropdown
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      handleDeleteProduct(productToDelete._id);
      setIsConfirmModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
    setProductToDelete(null);
  };

  const handleCloseCardModal = () => {
    setIsCardModalOpen(false); // Cierra la modal de detalles
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [products, searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
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
  }, [filteredProducts, sortField, sortOrder]);

  const indexOfLastProduct = currentPage * rowsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - rowsPerPage;
  const currentProducts = useMemo(
    () => sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct),
    [sortedProducts, indexOfFirstProduct, indexOfLastProduct]
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

  const totalPages = Math.ceil(sortedProducts.length / rowsPerPage);

  return (
    <div className="product-table-container">
      <div className="table-header">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o categoría"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Buscar productos"
        />

        <div className="header-actions">
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsAddModalOpen(true);
            }}
            className="add-product-button"
          >
            Agregar Producto
          </button>

          <div className="rows-per-page">
            <span>Filas por página:</span>
            <select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              aria-label="Filas por página"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>

      <ProductFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddProduct}
      />

      <UpdateProductFormModal
        productId={selectedProduct?._id}
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onSubmit={handleEditProduct}
        initialData={selectedProduct}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message={`¿Estás seguro de eliminar el producto ${productToDelete?.name}?`}
      />

      {isCardModalOpen && selectedProduct && (
        <CardModal
          title={selectedProduct.name}
          description={selectedProduct.description || "Sin descripción"}
          stock={selectedProduct.stock}
          price={selectedProduct.price}
          discount={selectedProduct.discount || 0}
          imageUrl={selectedProduct.imageUrl || "https://via.placeholder.com/400"}
          onClose={handleCloseCardModal}
        />
      )}

      <h2 className="table-title">Lista de Productos</h2>

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              {Object.keys(columns).map((key) => (
                <th key={key} onClick={() => handleSortChange(key)}>
                  {columns[key]}{" "}
                  {sortField === key &&
                    (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
                </th>
              ))}
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                {Object.keys(columns).map((key) => (
                  <td key={key}>{product[key]}</td>
                ))}
                <td>
                  <select
                    onChange={(event) => handleActionChange(event, product)}
                    className="action-select"
                    aria-label="Acciones"
                  >
                    <option value="">Seleccionar acción</option>
                    <option value="ver">Ver</option>
                    <option value="editar">Editar</option>
                    <option value="eliminar">Eliminar</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default ProductTable;