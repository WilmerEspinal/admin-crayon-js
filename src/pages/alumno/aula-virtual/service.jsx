import axios from "axios";

export const ProductService = {
  getProductsMini() {
    // Reemplaza la URL con tu endpoint real para obtener las cuotas
    return axios
      .get("http://127.0.0.1:8000/api/cuotas", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }) // Asumiendo que este es el endpoint para obtener las cuotas del alumno autenticado
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching cuotas:", error);
        return [];
      });
  },
};
