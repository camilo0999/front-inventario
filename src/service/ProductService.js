const API_URL_BASE = 'https://server-clce.onrender.com/api';

export const GetAllProducts = async () => {
    try {
        // Obtener el token de autenticación (si es necesario)
        const token = localStorage.getItem('token'); // Ajusta según cómo almacenes el token

        const response = await fetch(`${API_URL_BASE}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Incluir el token si es necesario
            },
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener los productos');
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        return { success: true, data }; // Devolver un objeto con los datos
    } catch (error) {
        console.error('Error en la solicitud de productos:', error);
        return { success: false, error: error.message }; // Devolver un objeto con el error
    }
};

export const CreateProduct = async (product) => {
    try {
        // Obtener el token de autenticación (si es necesario)
        const token = localStorage.getItem('token'); // Ajusta según cómo almacenes el token

        const response = await fetch(`${API_URL_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Incluir el token si es necesario
            },
            body: JSON.stringify(product),
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el producto');
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        return { success: true, data }; // Devolver un objeto con los datos
    } catch (error) {
        console.error('Error en la creación de producto:', error);
        return { success: false, error: error.message }; // Devolver un objeto con el error
    }
};

export const DeleteProduct = async (productId) => {
    try {
        // Obtener el token de autenticación (si es necesario)
        const token = localStorage.getItem('token'); // Ajusta segúncomo almacenes el token

        const response = await fetch(`${API_URL_BASE}/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Incluir el token si es necesario
            },
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar el producto');
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        return { success: true, data }; // Devolver un objeto con los datos
    } catch (error) {
        console.error('Error en la eliminación de producto:', error);
        return { success: false, error: error.message }; // Devolver un objeto con el error
    }
};


export const UpdateProduct = async (productId, product) => {
    try {
        // Obtener el token de autenticación del localStorage (ajusta según cómo almacenes el token)
        const token = localStorage.getItem('token'); 
        console.log(productId);

        const response = await fetch(`${API_URL_BASE}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Incluir el token en la cabecera de autorización
            },
            body: JSON.stringify(product),
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar el producto');
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        return { success: true, data }; // Devolver un objeto con los datos
    } catch (error) {
        console.error('Error en la actualización de producto:', error);
        return { success: false, error: error.message }; // Devolver un objeto con el error
    }
};