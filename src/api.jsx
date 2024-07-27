export const getUser = async () => {
    let API_URL = 'http://127.0.0.1:8000/api'
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const response = await axios.get(`${API_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return null;
    }
};