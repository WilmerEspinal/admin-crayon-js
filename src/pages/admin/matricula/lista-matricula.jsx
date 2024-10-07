import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListaAlumnosMatriculados = () => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [alumnoToDelete, setAlumnoToDelete] = useState(null);
  const toast = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Lista alumnos - Crayons";

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

  const fetchAlumnos = async (gradoId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/alumno/${gradoId}/familia`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlumnos(response.data);
    } catch (error) {
      console.error("Error fetching alumnos:", error);
    }
  };

  const handleShowStudents = () => {
    if (selectedGrado) {
      fetchAlumnos(selectedGrado);
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Advertencia",
        detail: "Por favor, selecciona un grado.",
        life: 3000,
      });
    }
  };

  const rowExpansionTemplate = (data) => {
    return (
      <div className="p-3">
        <h3 className="title_detalle_table">Detalles del Alumno</h3>
        <p>
          <strong>DNI: </strong>
          {data.dni}
        </p>
        <p>
          <strong>Teléfono: </strong>
          {data.telefono || "No disponible"}
        </p>
        <p>
          <strong>Dirección: </strong>
          {data.direccion || "No disponible"}
        </p>
        <hr />
        {Array.isArray(data.familia) && data.familia.length > 0 ? (
          <div>
            <h3 className="title_detalle_table">Detalles de la Familia</h3>
            {data.familia.map((familiar, index) => {
              return (
                <div key={index}>
                  <h3 className="title_detalle_table">
                    {familiar.relacion.charAt(0).toUpperCase() +
                      familiar.relacion.slice(1)}
                  </h3>
                  <p>
                    <strong>Nombre: </strong>
                    {`${familiar.nombre} ${familiar.ap_paterno} ${familiar.ap_materno}`}
                  </p>
                  <p>
                    <strong>DNI: </strong>
                    {familiar.dni}
                  </p>
                  <hr />
                </div>
              );
            })}
          </div>
        ) : (
          <p>No hay detalles de familiares disponibles.</p>
        )}
      </div>
    );
  };

  return (
    <>
      <section className="container_lista_docente">
        <h3 className="">Lista de Alumnos Matriculados</h3>
        <section className="secction_grado_options conatiner_btn_accion">
          <div>
            <Dropdown
              value={selectedGrado}
              onChange={(e) => setSelectedGrado(e.value)}
              options={grados}
              optionLabel="label"
              placeholder="Seleccionar un grado"
              className="w-full md:w-14rem"
            />
          </div>
          <Button label="Mostrar Alumnos" onClick={handleShowStudents} />
        </section>

        <section>
          <h2 className="">Alumnos:</h2>
          <Toast ref={toast} />
          {alumnos.length > 0 ? (
            <DataTable
              value={alumnos}
              tableStyle={{ minWidth: "50rem" }}
              expandedRows={expandedRows}
              onRowToggle={(e) => setExpandedRows(e.data ? e.data : [])}
              rowExpansionTemplate={rowExpansionTemplate}
              dataKey="id" // Cambia el dataKey a "id"
            >
              <Column expander style={{ width: "3em" }} />
              <Column field="dni" header="DNI" />
              <Column field="nombre" header="Nombre" />
              <Column field="ap_paterno" header="Apellido Paterno" />
              <Column field="ap_materno" header="Apellido Materno" />
              <Column
                header="Acción"
                body={(rowData) => (
                  <div className="conatiner_btn_accion">
                    <Button
                      label="Editar"
                      onClick={() =>
                        navigate(
                          `/admin-crayon/editar-estudiante/${rowData.id}` // Usa el id del alumno aquí
                        )
                      } // Navegación al formulario de edición
                    />
                  </div>
                )}
              />
            </DataTable>
          ) : (
            <p>No hay alumnos para mostrar.</p>
          )}
        </section>
      </section>

      {/* Diálogo de confirmación de eliminación */}
    </>
  );
};

export default ListaAlumnosMatriculados;
