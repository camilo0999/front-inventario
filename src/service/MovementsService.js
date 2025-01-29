const API_URL_BASE = 'https://server-clce.onrender.com/api';

export const GetAllMovements = async () => {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL_BASE}/inventory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener los movimientos');
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud de movimientos:', error);
        return { success: false, error: error.message }; // Devolver un objeto con el error
    }
};