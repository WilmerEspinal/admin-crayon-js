import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const FormDocente = ({ data, setData }) => {
  const [date, setDate] = useState(null);
  const departamento = [{ label: "Satipo", value: "satipo" }];
  const provincia = [{ label: "Provincia", value: "provincia" }];
  const distrito = [{ label: "Distrito", value: "distrito" }];

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/lista-cursos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const formattedCursos = response.data.map((curso) => ({
          label: curso.descripcion,
          value: curso.id,
        }));
        setCourses(formattedCursos);
      })
      .catch((error) => {
        console.error("Error fetching cursos:", error);
      });
  }, []);

  const onCourseChange = (e) => {
    let _selectedCourses = [...selectedCourses];
    let _selectedCourseIds = Array.isArray(data.selectedCourseIds)
      ? [...data.selectedCourseIds]
      : [];

    if (e.checked) {
      _selectedCourses.push({ label: e.value.label, value: e.value.value });
      _selectedCourseIds.push(e.value.value); // Add the course ID
    } else {
      _selectedCourses = _selectedCourses.filter(
        (course) => course.value !== e.value.value
      );
      _selectedCourseIds = _selectedCourseIds.filter(
        (id) => id !== e.value.value
      ); // Remove the course ID
    }

    setSelectedCourses(_selectedCourses);
    setData((prevData) => ({
      ...prevData,
      selectedCourseIds: _selectedCourseIds, // Update selected course IDs
    }));
  };

  const selectedCoursesLabel = selectedCourses.length
    ? selectedCourses.map((course) => course.label).join(", ")
    : "Seleccionar cursos";
  const customDropdownOption = (
    <div className="flex flex-column gap-3 p-2">
      {courses.map((course) => (
        <div key={course.value} className="container_checks">
          <Checkbox
            inputId={course.value}
            name="course"
            value={course}
            onChange={onCourseChange}
            checked={selectedCourses.some(
              (item) => item.value === course.value
            )}
          />
          <label htmlFor={course.value} className="ml-2">
            {course.label}
          </label>
        </div>
      ))}
    </div>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      date: e.value,
    }));
  };

  const handleDropdownChange = (e, fieldName) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: e.value,
    }));
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    axios
      .get(`http://127.0.0.1:8000/api/consulta-dni/${data.dni}`)
      .then((response) => {
        setData((prevData) => ({
          ...response.data,
          dni: prevData.dni,
        }));
      })
      .catch((error) => {
        console.error("Error al obtener datos", error);
      });
  };

  return (
    <div className="container_inputs_estudiantes">
      <div>
        <label className="label_input_dni">
          DNI
          <span className="container_input_dni">
            <InputText
              className="input_dni input"
              type="number"
              name="dni"
              value={data.dni || ""}
              onChange={handleChange}
            />
            <Button onClick={handleBuscar}>Buscar</Button>
          </span>
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Apellido Paterno
          <InputText
            className="input"
            name="apellidoPaterno"
            value={data.apellidoPaterno || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Apellido Materno
          <InputText
            className="input"
            name="apellidoMaterno"
            value={data.apellidoMaterno || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Nombres
          <InputText
            className="input"
            name="nombres"
            value={data.nombres || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="">
        <label className="container_inputs">
          F.N
          <Calendar
            className="input_calendar"
            placeholder="MM/DD/YYYY"
            value={data.date}
            onChange={handleDateChange}
            name="date"
          />
        </label>
      </div>

      <div>
        <label className="container_inputs">
          Departamento
          <Dropdown
            value={data.departamento}
            onChange={(e) => handleDropdownChange(e, "departamento")}
            options={departamento}
            optionLabel="label"
            placeholder="Selecionar departamento"
            className="w-full md:w-14rem"
          />
        </label>
      </div>

      <div>
        <label className="container_inputs">
          Provincia
          <Dropdown
            value={data.provincia}
            onChange={(e) => handleDropdownChange(e, "provincia")}
            options={provincia}
            optionLabel="label"
            placeholder="Seleccionar provincia"
            className="w-full md:w-14rem"
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Distrito
          <Dropdown
            value={data.distrito}
            onChange={(e) => handleDropdownChange(e, "distrito")}
            options={distrito}
            optionLabel="label"
            placeholder="Seleccionar distrito"
            className="w-full md:w-14rem"
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Direccion
          <InputText
            className="input"
            name="direccion"
            value={data.direccion || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Correo electrónico
          <InputText
            className="input"
            type="email"
            name="email"
            placeholder="ejemplo@gmail.com"
            value={data.email || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Celular
          <InputText
            type="number"
            name="telefono"
            value={data.telefono}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="">
        <label className="container_inputs">
          Cursos
          <Dropdown
            value={selectedCourses}
            options={[]}
            placeholder={selectedCoursesLabel}
            className="w-full md:w-14rem"
            panelClassName="custom-dropdown-panel"
            emptyMessage={customDropdownOption} // Renderizar los checkboxes como opciones
            itemTemplate={customDropdownOption} // Usar el template personalizado
          />
        </label>
      </div>
    </div>
  );
};

export default FormDocente;
