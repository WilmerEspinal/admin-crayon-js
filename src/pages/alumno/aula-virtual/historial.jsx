import React, { useEffect, useState } from "react";

import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import axios from "axios";

const HistorialCuotas = () => {
  const [historialCuotas, setHistorialCuotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Cuotas historial - Crayons";
  }, []);

  useEffect(() => {
    // Función para obtener las cuotas pagadas del alumno
    const obtenerCuotasPagadas = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/cuotas/pagadas",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = response.data;

        // Crear un array con la información de las cuotas pagadas
        const cuotasArray = Object.keys(data.cuotas).reduce((acc, key) => {
          const cuotaEstado = data.cuotas[`c${key.split("_")[1]}_estado`];
          if (key.startsWith("cuota_") && cuotaEstado === 1) {
            acc.push({
              dni: data.dni_alumno,
              cuota_numero: `Cuota ${key.split("_")[1]}`,
              cuota: data.cuotas[key],
              annio: new Date().getFullYear(),
              estado: cuotaEstado === 1 ? "Pagado" : "Pendiente",
            });
          }
          return acc;
        }, []);

        setHistorialCuotas(cuotasArray);
      } catch (error) {
        console.error("Error al obtener las cuotas pagadas:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerCuotasPagadas();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container_table_historial">
      <h2>Historial de Cuotas Pagadas</h2>
      <DataTable value={historialCuotas} tableStyle={{ minWidth: "50rem" }}>
        <Column field="dni" header="DNI" />
        <Column field="cuota_numero" header="Número de Cuota" />
        <Column field="estado" header="Estado" />
        <Column field="annio" header="Año" />
      </DataTable>
    </div>
  );
};

export default HistorialCuotas;
