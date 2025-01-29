import React, { useState } from "react";
import "../styles/GeneratePurchase.css"; // Importamos el archivo CSS
import MenuSidebar from "../components/MenuSidebar";
import { createPurchase } from "../service/ShoppingService"; // Importa el servicio

const GeneratePurchase = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    user: "", // ID del usuario (ahora editable)
    products: [
      {
        product: "", // ID del producto
        quantity: "", // Cantidad del producto
      },
    ],
  });

  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(""); // Estado para manejar errores

  // Manejar cambios en los campos del formulario
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    if (name === "user") {
      // Si el campo es "user", actualizamos el estado directamente
      setFormData((prev) => ({
        ...prev,
        user: value,
      }));
    } else {
      // Si el campo es de un producto, actualizamos el array de productos
      const updatedProducts = [...formData.products];
      updatedProducts[index][name] = value;

      setFormData((prev) => ({
        ...prev,
        products: updatedProducts,
      }));
    }
  };

  // Agregar un nuevo producto al formulario
  const addProduct = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { product: "", quantity: "" }],
    }));
  };

  // Eliminar un producto del formulario
  const removeProduct = (index) => {
    const updatedProducts = formData.products.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      products: updatedProducts,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el estado de carga
    setError(""); // Limpiar errores anteriores

    // Validar campos obligatorios
    if (!formData.user) {
      setError("El ID del usuario es obligatorio");
      setLoading(false);
      return;
    }

    const isValid = formData.products.every(
      (item) => item.product && item.quantity
    );
    if (!isValid) {
      setError("Todos los campos de los productos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      // Llamar al servicio para generar la compra
      const result = await createPurchase(formData);

      if (result.success) {
        console.log("Compra generada:", result.data);
        alert("Compra generada exitosamente"); // Mostrar mensaje de éxito
        setFormData({
          user: "",
          products: [{ product: "", quantity: "" }],
        }); // Limpiar el formulario
      } else {
        setError(result.error); // Mostrar el mensaje de error
      }
    } catch (error) {
      console.error("Error en la generación de compra:", error);
      setError("Error en la conexión con el servidor");
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  return (
    <div className="generate-purchase">
      {/* Sidebar fija a la izquierda */}
      <MenuSidebar className="fixed-sidebar" />

      {/* Contenido principal */}
      <div className="main-content">
        {/* Cabecera fija */}
        <header className="header">
          <h1>Generar Compra</h1>
        </header>

        {/* Contenido con padding para no quedar tapado por la cabecera */}
        <main className="content">
          <p className="welcome-text">
            Completa el formulario para generar una nueva compra.
          </p>

          {/* Formulario para generar la compra */}
          <form onSubmit={handleSubmit}>
            {/* Campo para el ID del usuario */}
            <div className="form-group">
              <label htmlFor="user">ID del Usuario</label>
              <input
                type="text"
                id="user"
                name="user"
                value={formData.user}
                onChange={(e) => handleChange(null, e)} // No necesita índice
                placeholder="Ej: 6791857a9ac40432a04a629a"
                required
              />
            </div>

            {/* Campos para los productos */}
            {formData.products.map((product, index) => (
              <div key={index} className="product-group">
                <div className="form-group">
                  <label htmlFor={`product-${index}`}>Producto (ID)</label>
                  <input
                    type="text"
                    id={`product-${index}`}
                    name="product"
                    value={product.product}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Ej: 6791bd59a6972f9b8ce04393"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`quantity-${index}`}>Cantidad</label>
                  <input
                    type="number"
                    id={`quantity-${index}`}
                    name="quantity"
                    value={product.quantity}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Ej: 2"
                    required
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeProduct(index)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-button"
              onClick={addProduct}
            >
              Agregar Producto
            </button>
            {error && <p className="error-message">{error}</p>} {/* Mostrar errores */}
            <div className="form-actions">
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Generando..." : "Generar Compra"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default GeneratePurchase;