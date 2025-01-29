import React, { useState, useEffect } from "react";
import "../../styles/ProductFormModal.css";
import { UpdateProduct } from "../../service/ProductService";

const UpdateProductFormModal = ({
  productId,
  isOpen,
  onClose,
  initialData, // Cambiado de productToUpdate a initialData
  onSubmit,    // Cambiado de onUpdate a onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    imageUrl: "",
    discounts: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prellenar el formulario cuando initialData cambie
  useEffect(() => {
    if (initialData) {
      setFormData({
        _id: initialData._id || "",
        name: initialData.name || "",
        price: initialData.price || "",
        category: initialData.category || "",
        stock: initialData.stock || "",
        description: initialData.description || "",
        imageUrl: initialData.imageUrl || "",
        discounts: initialData.discounts || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await UpdateProduct(productId, formData);

      if (result.success) {
        console.log("Producto actualizado:", result.data);
        onSubmit(result.data); // Cambiado de onUpdate a onSubmit
        onClose(); // Cerrar el modal después de una actualización exitosa
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Error en la conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Editar Producto</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre del Producto</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Laptop"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Ej: 1200"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Ej: Electrónica"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Ej: 50"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ej: Una laptop potente para trabajo y juegos"
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">URL de la Imagen</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Ej: https://example.com/image.jpg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="discounts">Descuentos</label>
            <input
              type="text"
              id="discounts"
              name="discounts"
              value={formData.discounts}
              onChange={handleChange}
              placeholder="Ej: 10%"
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductFormModal;