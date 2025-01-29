const API_URL_BASE = 'https://server-clce.onrender.com/api';

export const Login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        // Verificar si la respuesta es exitosa (código 2xx)
        if (!response.ok) {
            // Si la respuesta no es exitosa, lanzar un error con el mensaje del servidor
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la autenticación');
        }

        // Parsear la respuesta JSON
        const data = await response.json();
        localStorage.setItem('token', data.token); // Guardar el token en el localStorage
        localStorage.setItem('auth', "true");
        return { success: true, data }; 
    } catch (error) {
        // Capturar errores de red o de la API
        console.error('Error en la solicitud de login:', error);
        return { success: false, error: error.message }; // Devolver un objeto con el error
    }
};