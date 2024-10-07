import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import { useState } from "react";

const FormPadre = ({ data, setData }) => {
  const [date, setDate] = useState(null);

  const handleBuscar = () => {
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

  const relacion = [
    { label: "Padre", value: "padre" },
    { label: "Madre", value: "madre" },
    { label: "Hermano", value: "Hermano" },
    { label: "Abuelo", value: "abuelo" },
  ];

  const handleDropdownChange = (e, fieldName) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: e.value,
    }));
  };

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

  return (
    <div className="inputs_datos_familia">
      <div className="">
        <label className="label_input_dni">
          DNI
          <span className="container_input_dni">
            <InputText
              className="input_dni"
              type="number"
              name="dni"
              value={data.dni}
              onChange={handleChange}
              required
            />
            <Button onClick={handleBuscar}>Buscar</Button>
          </span>
        </label>
      </div>

      <div>
        <label className="container_inputs">
          Apellido Paterno
          <InputText
            name="apellidoPaterno"
            value={data.apellidoPaterno}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Apellido Materno
          <InputText
            name="apellidoMaterno"
            value={data.apellidoMaterno}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label className="container_inputs">
          Nombres
          <InputText
            name="nombres"
            value={data.nombres}
            onChange={handleChange}
            required
          />
        </label>
      </div>

      <div>
        <label className="container_inputs">
          F.N
          <Calendar
            placeholder="MM/DD/YYYY"
            value={data.date}
            onChange={handleDateChange}
            required
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Email
          <InputText
            type="email"
            placeholder="ejemplo@gmail.com"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
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
            required
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Relacion
          <Dropdown
            value={data.relacion}
            onChange={(e) => handleDropdownChange(e, "relacion")}
            options={relacion}
            optionLabel="label"
            placeholder="Seleccione"
            className="w-full md:w-14rem"
            required
          />
        </label>
      </div>
    </div>
  );
};

export default FormPadre;
