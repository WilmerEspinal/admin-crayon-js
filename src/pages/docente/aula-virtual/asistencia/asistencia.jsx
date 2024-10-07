import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

const Asistencia = () => {
  const [grados, setGrados] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState(null);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [asistencia, setAsistencia] = useState({});

  useEffect(() => {
    document.title = "Registar asistencia - Crayons";
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/lista-grado", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const formattedGrados = response.data.map((grado) => ({
          label: grado.descripcion,
          value: grado.id,
        }));
        setGrados(formattedGrados);
      })
      .catch((error) => {
        console.error("Error fetching grados:", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/curso", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const cursosData = response.data.data.flatMap((docente) =>
          docente.cursos.map((curso) => ({
            label: curso.descripcion,
            value: curso.id,
          }))
        );
        setCursos(cursosData);
      })
      .catch((error) => {
        console.error("Error fetching cursos:", error);
      });
  }, []);

  const fetchAlumnos = (gradoId) => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/api/alumnos/grado/${gradoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const alumnosData = response.data;
        console.log("Alumnos fetched:", alumnosData); // Log the fetched alumnos
        setAlumnos(alumnosData);
        setAsistencia({}); // Reset attendance state when fetching new students
      })
      .catch((error) => {
        console.error("Error fetching alumnos:", error);
      });
  };

  const handleShowStudents = () => {
    if (selectedGrado) {
      fetchAlumnos(selectedGrado);
    } else {
      alert("Por favor, selecciona un grado.");
    }
  };

  const handleCheckboxChange = (idAlumno, checked) => {
    setAsistencia((prevState) => ({
      ...prevState,
      [idAlumno]: checked,
    }));
  };

  const handleSaveAsistencia = () => {
    const token = localStorage.getItem("token");

    // Crear asistenciaData desde alumnos
    const asistenciaData = alumnos.map((alumno) => ({
      id_alumno: alumno.id, // Usar el campo id_alumno aquí
      fecha: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
      estado_asistencia: asistencia[alumno.id] || false, // Usar id_alumno para el estado del checkbox
    }));

    // Log para verificar la estructura de asistenciaData
    console.log("Asistencia Data:", asistenciaData);

    // Verificar si asistenciaData está vacío
    if (asistenciaData.length === 0) {
      alert("No hay alumnos para registrar asistencia.");
      return;
    }

    // Enviar los datos al backend
    axios
      .post(
        "http://127.0.0.1:8000/api/registrar-asistencia",
        { asistencias: asistenciaData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        alert("Asistencia registrada con éxito");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error("Error registrando asistencia:", error.response.data);
          alert(`Error: ${JSON.stringify(error.response.data)}`);
        } else {
          console.error("Error registrando asistencia:", error);
          alert("Error desconocido al registrar asistencia");
        }
      });
  };

  const estadoBodyTemplate = (rowData) => {
    return (
      <Checkbox
        checked={!!asistencia[rowData.id]}
        onChange={(e) => handleCheckboxChange(rowData.id, e.checked)}
        inputId={`alumno_${rowData.id}`}
      />
    );
  };

  return (
    <>
      <section className="container_admin aul_docente">
        <h1>Registrar nueva asistencia</h1>
        <section className="secction_grado_options">
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
          <div>
            <Dropdown
              value={selectedCurso}
              onChange={(e) => setSelectedCurso(e.value)}
              options={cursos}
              optionLabel="label"
              placeholder="Seleccionar un curso"
              className="w-full md:w-14rem"
            />
          </div>
          <Button onClick={handleShowStudents}>Mostrar</Button>
        </section>

        <section>
          <h2>Alumnos:</h2>
          {alumnos.length > 0 ? (
            <DataTable
              value={alumnos}
              columnResizeMode="expand"
              resizableColumns
              showGridlines
              tableStyle={{ minWidth: "50rem" }}
            >
              <Column field="dni" header="DNI"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="ap_paterno" header="Apellido Paterno"></Column>
              <Column field="ap_materno" header="Apellido Materno"></Column>
              <Column header="Estado" body={estadoBodyTemplate} />
            </DataTable>
          ) : (
            <p>No hay alumnos para mostrar.</p>
          )}
          <Button onClick={handleSaveAsistencia} label="Guardar Asistencia" />
        </section>
      </section>
    </>
  );
};

export default Asistencia;
