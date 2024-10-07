import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditarDocente = () => {
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const messageRef = useRef(null);

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };

  useEffect(() => {
    document.title = "Editar datos - Crayons";
    const fetchDocente = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/docente/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const fetchedDocente = response.data[0];

        // Convert fecha_nacimiento string to Date object if available
        if (fetchedDocente.fecha_nacimiento) {
          const dateParts = fetchedDocente.fecha_nacimiento.split("-");
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
          const day = parseInt(dateParts[2], 10);
          fetchedDocente.fecha_nacimiento = new Date(year, month, day);
        }

        setDocente(fetchedDocente);

        const cursoIds = fetchedDocente.cursos.map((curso) => curso.id);
        setSelectedCourses(cursoIds);
      } catch (err) {
        console.error("Error fetching docente data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocente();
  }, [id]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/lista-cursos",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const formattedCursos = response.data.map((curso) => ({
          label: curso.descripcion,
          value: curso.id,
        }));
        setCourses(formattedCursos);
      } catch (error) {
        console.error("Error fetching cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseChange = (course) => {
    let updatedSelectedCourses;

    if (selectedCourses.includes(course.value)) {
      // Remover el curso seleccionado
      updatedSelectedCourses = selectedCourses.filter(
        (id) => id !== course.value
      );
    } else {
      // Agregar el curso seleccionado
      updatedSelectedCourses = [...selectedCourses, course.value];
    }

    setSelectedCourses(updatedSelectedCourses);
  };

  const courseItemTemplate = (option) => {
    return (
      <div className="flex align-items-center">
        <Checkbox
          checked={selectedCourses.includes(option.value)}
          onChange={() => handleCourseChange(option)}
        />
        <label className="ml-2">{option.label}</label>
      </div>
    );
  };

  if (loading) return <p>Cargando...</p>;
  if (!docente) return <p>Docente no encontrado.</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validSelectedCourses = selectedCourses.filter(
      (course) => course !== undefined
    );

    const updatedDocente = {
      nombre: docente.nombre,
      dni: docente.dni,
      ap_paterno: docente.ap_paterno,
      ap_materno: docente.ap_materno,
      direccion: docente.direccion,
      telefono: docente.telefono,
      fecha_nacimiento: docente.fecha_nacimiento
        ? formatDate(docente.fecha_nacimiento)
        : null, // Format fecha_nacimiento
      cursos: validSelectedCourses,
    };

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/modificar-docente/${id}`,
        updatedDocente,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccessMessage("Docente actualizado correctamente.");

      messageRef.current.show({
        severity: "success",
        summary: "Actualización exitosa",
        life: 3000,
      });
    } catch (err) {
      console.error("Error updating docente:", err);

      messageRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Debe seleccionar al menos un curso.",
        life: 3000,
      });
    }
  };

  return (
    <div className="home_editar">
      <h3>Editar Docente</h3>
      <div className="container_mensaje">
        <Messages className="mensaje" ref={messageRef} />
      </div>
      <form className="container_inputs_estudiantes" onSubmit={handleSubmit}>
        {/* Input fields */}
        <label className="container_inputs">
          Nombre
          <InputText
            type="text"
            name="nombre"
            value={docente.nombre || ""}
            placeholder="Nombre"
            onChange={(e) => setDocente({ ...docente, nombre: e.target.value })}
          />
        </label>
        {/* Additional input fields */}
        <label className="container_inputs">
          Apellido paterno
          <InputText
            type="text"
            name="ap_paterno"
            value={docente.ap_paterno || ""}
            placeholder="Apellido Paterno"
            onChange={(e) =>
              setDocente({ ...docente, ap_paterno: e.target.value })
            }
          />
        </label>
        <label className="container_inputs">
          Apellido Materno
          <InputText
            type="text"
            name="ap_materno"
            value={docente.ap_materno || ""}
            placeholder="Apellido Materno"
            onChange={(e) =>
              setDocente({ ...docente, ap_materno: e.target.value })
            }
          />
        </label>
        <label className="container_inputs">
          DNI
          <InputText
            type="text"
            name="dni"
            value={docente.dni || ""}
            placeholder="DNI"
          />
        </label>
        <label className="container_inputs">
          Dirección
          <InputText
            type="text"
            name="direccion"
            value={docente.direccion || ""}
            placeholder="Dirección"
            onChange={(e) =>
              setDocente({ ...docente, direccion: e.target.value })
            }
          />
        </label>
        <label className="container_inputs">
          Teléfono
          <InputText
            type="text"
            name="telefono"
            value={docente.telefono || ""}
            placeholder="Teléfono"
            onChange={(e) =>
              setDocente({ ...docente, telefono: e.target.value })
            }
          />
        </label>
        <label className="container_inputs">
          F.N
          <Calendar
            className="input_calendar"
            name="fecha_nacimiento"
            value={docente.fecha_nacimiento}
            onChange={(e) =>
              setDocente({ ...docente, fecha_nacimiento: e.value })
            }
          />
        </label>

        <label className="container_inputs">
          Cursos Seleccionados
          <Dropdown
            value={selectedCourses}
            options={courses}
            onChange={(e) => handleCourseChange(e.value)}
            itemTemplate={courseItemTemplate}
            placeholder="Seleccionar cursos"
            className="w-full md:w-14rem"
          />
        </label>

        <Button
          label="Actualizar"
          type="submit"
          disabled={selectedCourses.length === 0}
        />
      </form>
    </div>
  );
};

export default EditarDocente;
