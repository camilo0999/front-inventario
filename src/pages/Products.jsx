import React, { useState, useEffect } from "react";
import { GetAllProducts } from "../service/ProductService";
import Navbar from "../components/Navbar";
import "../styles/Products.css";
import Footer from "../components/Footer";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await GetAllProducts();
                if (response.success) {
                    setProducts(response.data);
                } else {
                    setError(response.error || "Error al obtener los productos");
                }
            } catch (error) {
                setError("Error en la conexión con el servidor");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <Navbar />
            <div className="products-container">
                <h1 className="title">Productos</h1>
                {loading ? (
                    <p className="loading-message">Cargando productos...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="products-list">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <div key={product.id} className="product-card">
                                    {product.imageUrl ? (
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                    ) : (
                                        <div className="no-image">Imagen no disponible</div>
                                    )}
                                    <h2 className="product-name">{product.name}</h2>
                                    <p className="product-description">{product.description}</p>
                                    <p className="product-price">Precio: ${product.price}</p>
                                    <p className="product-stock">Stock: {product.stock}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-products">No hay productos disponibles.</p>
                        )}
                    </div>
                )}

               
            </div>
            <Footer />
        </>
    );
};

export default Products;