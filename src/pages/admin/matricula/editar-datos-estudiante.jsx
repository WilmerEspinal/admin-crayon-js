import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const EditarDatosEstudiante = () => {
  const [dataEstudiante, setDataEstudiante] = useState({});
  const [dataFamilia, setDataFamilia] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  // Options for grades
  const gradoOptions = [
    { label: "1er Grado", value: 1 },
    { label: "2do Grado", value: 2 },
    { label: "3er Grado", value: 3 },
    { label: "4to Grado", value: 4 },
    { label: "5to Grado", value: 5 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEstudiante = await axios.get(
          `http://127.0.0.1:8000/api/alumno/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (responseEstudiante.data) {
          // Asigna el grado directamente desde la respuesta
          responseEstudiante.data.grado = responseEstudiante.data.grado;

          // Convert fecha_nacimiento string to Date object
          if (responseEstudiante.data.fecha_nacimiento) {
            const dateParts =
              responseEstudiante.data.fecha_nacimiento.split("-");
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // Month is 0-indexed
            const day = parseInt(dateParts[2], 10);

            responseEstudiante.data.fecha_nacimiento = new Date(
              year,
              month,
              day
            );
          }

          setDataEstudiante(responseEstudiante.data);

          if (Array.isArray(responseEstudiante.data.familia)) {
            setDataFamilia(responseEstudiante.data.familia);
          } else {
            console.error("Familia data is not an array or is undefined");
          }
        } else {
          console.error("Datos del estudiante o familiares no encontrados");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate required fields
    if (
      !dataEstudiante.nombre ||
      !dataEstudiante.dni ||
      !dataEstudiante.ap_paterno ||
      !dataEstudiante.grado
    ) {
      alert("Por favor completa todos los campos requeridos.");
      return;
    }

    // Prepare the object to send, formatting the date properly
    const updatedEstudiante = {
      ...dataEstudiante,
      fecha_nacimiento: dataEstudiante.fecha_nacimiento
        ? formatDate(dataEstudiante.fecha_nacimiento) // Format to YYYY-MM-DD
        : null,
      familia: dataFamilia,
    };

    console.log("Datos que se enviarán:", updatedEstudiante);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/alumno/${id}/editar`,
        updatedEstudiante,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Respuesta del servidor:", response.data);
      navigate("/admin-crayon/lista-alumnos");
    } catch (error) {
      console.error(
        "Error al guardar los cambios:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleFamiliaChange = (index, updatedMiembro) => {
    const updatedFamilia = [...dataFamilia];
    updatedFamilia[index] = updatedMiembro; // Update the specific family member
    setDataFamilia(updatedFamilia);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <section className="container_home_editar">
      <h1>Editar Datos del Estudiante</h1>
      <form onSubmit={handleSubmit} className="">
        <h2>Datos del Estudiante</h2>
        <div className="inputs_datos_familia">
          <div className="p-field">
            <label className="container_inputs" htmlFor="nombre">
              Nombre
              <InputText
                id="nombre"
                value={dataEstudiante.nombre || ""}
                onChange={(e) =>
                  setDataEstudiante({
                    ...dataEstudiante,
                    nombre: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>

          <div className="p-field">
            <label className="container_inputs" htmlFor="apPaterno">
              Apellido Paterno
              <InputText
                id="apPaterno"
                value={dataEstudiante.ap_paterno || ""}
                onChange={(e) =>
                  setDataEstudiante({
                    ...dataEstudiante,
                    ap_paterno: e.target.value,
                  })
                }
                required
              />
            </label>
          </div>

          <div className="p-field">
            <label className="container_inputs" htmlFor="apMaterno">
              Apellido Materno
              <InputText
                id="apMaterno"
                value={dataEstudiante.ap_materno || ""}
                onChange={(e) =>
                  setDataEstudiante({
                    ...dataEstudiante,
                    ap_materno: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="p-field">
            <label className="container_inputs" htmlFor="dni">
              DNI
              <InputText
                id="dni"
                value={dataEstudiante.dni || ""}
                onChange={(e) =>
                  setDataEstudiante({ ...dataEstudiante, dni: e.target.value })
                }
                required
              />
            </label>
          </div>

          <div className="p-field">
            <label className="container_inputs" htmlFor="direccion">
              Dirección
              <InputText
                id="direccion"
                value={dataEstudiante.direccion || ""}
                onChange={(e) =>
                  setDataEstudiante({
                    ...dataEstudiante,
                    direccion: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="p-field">
            <label className="container_inputs" htmlFor="telefono">
              Teléfono
              <InputText
                id="telefono"
                value={dataEstudiante.telefono || ""}
                onChange={(e) =>
                  setDataEstudiante({
                    ...dataEstudiante,
                    telefono: e.target.value,
                  })
                }
              />
            </label>
          </div>

          <div className="p-field">
            <label className="container_inputs" htmlFor="fechaNacimiento">
              Fecha de Nacimiento
              <Calendar
                id="fechaNacimiento"
                value={dataEstudiante.fecha_nacimiento || null}
                onChange={(e) =>
                  setDataEstudiante({
                    ...dataEstudiante,
                    fecha_nacimiento: e.value, // Store the Date object
                  })
                }
                showIcon
                dateFormat="dd/mm/yy" // Display in DD/MM/YYYY format
              />
            </label>
          </div>

          {/* Field for Grade */}
          <div className="p-field">
            <label className="container_inputs" htmlFor="grado">
              Grado
              <Dropdown
                id="grado"
                value={dataEstudiante.grado || null} // Esto debería coincidir con el grado en la respuesta de la API
                options={gradoOptions}
                onChange={(e) =>
                  setDataEstudiante({
                    ...dataEstudiante,
                    grado: e.value, // Actualiza el grado al seleccionar
                  })
                }
                placeholder="Selecciona el grado"
              />
            </label>
          </div>
        </div>
        <hr />
        <h2>Datos de la Familia</h2>
        <div className="inputs_datos_familia">
          {dataFamilia.length > 0 ? (
            dataFamilia.map((miembro, index) => (
              <div key={miembro.dni} className="p-grid">
                <h3>{`Datos de ${
                  miembro.relacion || "Miembro de la Familia"
                }`}</h3>
                <div className="p-col">
                  <label
                    className="container_inputs"
                    htmlFor={`famId_${index}`}
                  >
                    ID
                    <InputText
                      id={`famId_${index}`}
                      value={miembro.id || ""} // Show the family member's ID
                      disabled // Disabled since it shouldn't be edited
                    />
                  </label>
                </div>
                <div className="p-col">
                  <label
                    className="container_inputs"
                    htmlFor={`famNombre_${index}`}
                  >
                    Nombre
                    <InputText
                      id={`famNombre_${index}`}
                      value={miembro.nombre || ""}
                      onChange={(e) =>
                        handleFamiliaChange(index, {
                          ...miembro,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="p-col">
                  <label
                    className="container_inputs"
                    htmlFor={`famApPaterno_${index}`}
                  >
                    Apellido Paterno
                    <InputText
                      id={`famApPaterno_${index}`}
                      value={miembro.ap_paterno || ""}
                      onChange={(e) =>
                        handleFamiliaChange(index, {
                          ...miembro,
                          ap_paterno: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="p-col">
                  <label
                    className="container_inputs"
                    htmlFor={`famApMaterno_${index}`}
                  >
                    Apellido Materno
                    <InputText
                      id={`famApMaterno_${index}`}
                      value={miembro.ap_materno || ""}
                      onChange={(e) =>
                        handleFamiliaChange(index, {
                          ...miembro,
                          ap_materno: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <div className="p-col">
                  <label
                    className="container_inputs"
                    htmlFor={`famDni_${index}`}
                  >
                    DNI
                    <InputText
                      id={`famDni_${index}`}
                      value={miembro.dni || ""}
                      onChange={(e) =>
                        handleFamiliaChange(index, {
                          ...miembro,
                          dni: e.target.value,
                        })
                      }
                    />
                  </label>
                </div>
                <hr />
                {/* Add more fields for family member details as needed */}
              </div>
            ))
          ) : (
            <p>No hay miembros de la familia registrados.</p>
          )}
        </div>

        <Button label="Guardar Cambios" type="submit" />
      </form>
    </section>
  );
};

export default EditarDatosEstudiante;
