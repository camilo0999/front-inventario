import React from "react";
import "../../styles/CardModal.css";

const CardModal = ({ title, description, stock, price, discount, imageUrl, onClose }) => {
    return (
        <div className="card-modal-overlay">
            <div className="card-modal">
                <div className="card-header">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="card-content">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>Stock: {stock}</p>
                    <p>Precio: ${price}</p>
                    <p>Descuento: {discount}%</p>
                </div>
                <div className="card-actions">
                    <button className="close-button" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};

export default CardModal;