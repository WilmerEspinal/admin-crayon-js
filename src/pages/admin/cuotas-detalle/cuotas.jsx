import React, { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button"; // Import Button component
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

const CuotasListaAdmin = () => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState(null);
  const [cuotas, setCuotas] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    document.title = "Cuotas - Administrador";
  }, []);

  // Obtener los grados para el dropdown
  useEffect(() => {
    const fetchGrados = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/lista-grado",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedGrados = response.data.map((grado) => ({
          label: grado.descripcion,
          value: grado.id,
        }));
        setGrados(formattedGrados);
      } catch (error) {
        console.error("Error fetching grados:", error);
      }
    };

    fetchGrados();
  }, []);

  // Obtener las cuotas según el grado seleccionado
  const fetchCuotasByGrado = async (gradoId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/cuotas-detalle/${gradoId}/lista`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      // Procesar cuotas
      const transformedCuotas = data.map((item) => ({
        dni: item.dni_alumno,
        nombre: item.nombre,
        ap_paterno: item.ap_paterno,
        ap_materno: item.ap_materno,
        costo_matricula: item.costo_matricula,
        matricula_estado: item.matricula_estado === 1 ? "Pagado" : "Pendiente",
        cuotas: item.cuotas,
      }));

      setCuotas(transformedCuotas);
    } catch (error) {
      console.error("Error fetching cuotas:", error);
    }
  };

  // Manejar el cambio en la selección de grado
  const handleGradoChange = (e) => {
    setSelectedGrado(e.value);
  };

  // Manejar el click del botón para mostrar las cuotas
  const handleShowCuotas = () => {
    if (selectedGrado) {
      fetchCuotasByGrado(selectedGrado);
    }
  };

  // Plantilla para el contenido expandido
  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h2 className="title_detalle_table">
          Detalles de cuotas para {data.nombre} {data.ap_paterno}{" "}
          {data.ap_materno}
        </h2>
        <DataTable value={data.cuotas} tableStyle={{ minWidth: "30rem" }}>
          <Column
            field="cuota"
            header="Número de Cuota"
            body={(rowData) => `Cuota ${rowData.cuota}`} // Display the cuota number
          ></Column>
          <Column field="monto" header="Monto"></Column>
          <Column
            field="estado"
            header="Estado"
            body={(rowData) => (
              <span style={{ color: rowData.estado === 0 ? "red" : "green" }}>
                {rowData.estado === 1 ? "Pagado" : "Pendiente"}
              </span>
            )}
          ></Column>
          <Column
            field="annio"
            header="Año"
            body={() => new Date().getFullYear()}
          ></Column>
        </DataTable>
      </div>
    );
  };

  return (
    <section className="container_lista_docente">
      <h3>Detalle de todas las cuotas</h3>
      {/* Dropdown para seleccionar el grado */}
      <div className="secction_grado_options container_btn_accion">
        <Dropdown
          value={selectedGrado}
          onChange={handleGradoChange}
          options={grados}
          optionLabel="label"
          placeholder="Seleccionar un grado"
          className="w-full md:w-14rem"
        />
        <Button
          label="Mostrar Cuotas"
          onClick={handleShowCuotas}
          disabled={!selectedGrado} // Disable button if no grado is selected
          className="ml-2" // Add margin for spacing
        />
      </div>

      {/* Tabla para mostrar las cuotas */}
      {cuotas.length > 0 && (
        <div className="container_table_cuotas">
          <h2 className="title_detalle_table">Detalles del pago de cuotas</h2>
          <DataTable
            value={cuotas}
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="dni" // Asegúrate de que cada fila tenga un identificador único
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column expander style={{ width: "5rem" }} />
            <Column field="dni" header="DNI"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="ap_paterno" header="Apellido Paterno"></Column>
            <Column field="ap_materno" header="Apellido Materno"></Column>
            <Column field="costo_matricula" header="Costo Matrícula"></Column>
            <Column
              field="matricula_estado"
              header="Estado Matrícula"
              body={(rowData) => (
                <span
                  style={{
                    color:
                      rowData.matricula_estado === "Pagado" ? "green" : "red",
                  }}
                >
                  {rowData.matricula_estado}
                </span>
              )}
            ></Column>
          </DataTable>
        </div>
      )}
    </section>
  );
};

export default CuotasListaAdmin;
