import React, { useState } from "react";
import { DownloadFacture } from "../service/FactureService";
import Navbar from "../components/Navbar";
import "../styles/Factures.css";
import Footer from "../components/Footer";

const Factures = () => {
  const [factureId, setFactureId] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async (e) => {
    e.preventDefault();
    setError("");

    if (!factureId.trim()) {
      setError("Por favor, ingrese un ID de factura válido.");
      return;
    }

    try {
      const response = await DownloadFacture(factureId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `factura_${factureId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar la factura:", error);
      setError(
        "No se pudo descargar la factura. Verifique el ID e intente nuevamente."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="factures-container">
        <h1 className="factures-title">Descargar Factura</h1>
        <form onSubmit={handleDownload} className="factures-form">
          <label className="factures-label">
            ID de Factura:
            <input
              type="text"
              value={factureId}
              onChange={(e) => setFactureId(e.target.value)}
              placeholder="Ingrese el ID de la factura"
              className="factures-input"
            />
          </label>
          <button type="submit" className="factures-button">
            Descargar
          </button>
        </form>
        {error && <p className="factures-error">{error}</p>}
      </div>
      <Footer />
    </>
  );
};

export default Factures;
