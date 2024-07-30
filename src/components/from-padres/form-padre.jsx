import axios from "axios";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

const FormPadre = ({ data, setData }) => {
  const [date, setDate] = useState(null);

  const handleBuscar = () => {
    axios
      .get(`http://127.0.0.1:8000/api/consulta-dni/${data.dni}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos", error);
      });
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
          />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Email
          <InputText
            type="email"
            placeholder="ejemplo@gmail.com"
            name="correoElectronico"
            value={data.email}
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
    </div>
  );
};

export default FormPadre;
