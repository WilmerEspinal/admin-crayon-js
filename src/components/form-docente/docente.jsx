import axios from "axios";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { useState } from "react";

const FormDocente = ({ data, setData }) => {
  const [date, setDate] = useState(null);

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
            <InputText className="input_dni" type="number" name="dni" />
            <Button>Buscar</Button>
          </span>
        </label>
      </div>

      <div>
        <label className="container_inputs">
          Apellido Paterno
          <InputText name="apellidoPaterno" />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Apellido Materno
          <InputText name="apellidoMaterno" />
        </label>
      </div>

      <div>
        <label className="container_inputs">
          Nombres
          <InputText name="nombres" />
        </label>
      </div>

      <div>
        <label className="container_inputs">
          F.N
          <Calendar placeholder="MM/DD/YYYY" />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Email
          <InputText type="email" placeholder="ejemplo@gmail.com" />
        </label>
      </div>
      <div>
        <label className="container_inputs">
          Celular
          <InputText type="number" />
        </label>
      </div>
    </div>
  );
};

export default FormDocente;
