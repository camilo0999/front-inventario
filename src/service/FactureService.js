const API_URL_BASE = "https://server-clce.onrender.com/api";

export const DownloadFacture = async (factureId) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error('No se encontró el token de autenticación.');
        return { success: false, error: 'No se encontró el token de autenticación.' };
    }

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await fetch(`${API_URL_BASE}/invoices/${factureId}`, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            const errorData = await response.json(); // Asume que el servidor devuelve un JSON en caso de error
            throw new Error(errorData.message || 'Error al descargar la factura');
        }

        // Verificar que la respuesta sea un PDF
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/pdf")) {
            throw new Error('La respuesta no es un archivo PDF válido. Tipo de contenido recibido: ' + contentType);
        }

        // Crear un blob a partir de la respuesta
        const blob = await response.blob();
        return { success: true, data: blob }; // Devuelve el Blob
    } catch (error) {
        console.error('Error al descargar la factura:', error);
        return { success: false, error: error.message };
    }
};