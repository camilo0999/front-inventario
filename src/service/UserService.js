const API_URL_BASE = 'https://server-clce.onrender.com/api';

export const GetAllUsers = async () => {
    try {
        // Obtener el token de autenticación (si es necesario)
        const token = localStorage.getItem('token'); // Ajusta según cómo almacenes el token

        console.log(token);

        const response = await fetch(`${API_URL_BASE}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener los usuarios');
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        return { success: true, data }; // Devolver un objeto con los datos
    } catch (error) {
        console.error('Error en la solicitud de usuarios:', error);
        return { success: false, error: error.message }; // Devolver un objeto con el error
    }
};

export const CreateUser = async (user) => {
    try {
        // Obtener el token de autenticación (si es necesario)
        const token = localStorage.getItem('token'); // Ajusta segúncomo almacenes el token

        const response = await fetch(`${API_URL_BASE}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Incluir el token si es necesario
            },
            body: JSON.stringify(user),
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el usuario');
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        return { success: true, data }; // Devolver un objeto con los datos
    } catch (error) {
        console.error('Error en la creación de usuario:', error);
        return { success: false, error: error.message }; // Devolver un objeto con el error
    }
};

