import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const FromEstudiante = ({ data, setData }) => {
  const pais = [{ name: "Perú" }];

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

  const departamento = [{ label: "Satipo", value: "satipo" }];
  const provincia = [{ label: "Provincia", value: "provincia" }];
  const distrito = [{ label: "Distrito", value: "distrito" }];

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

  return (
    <>
      <div className="flex flex-column h-12rem">
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
                required
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
                required
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
                required
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
                required
              />
            </label>
          </div>
          <div>
            <label className="container_inputs">
              Pais
              <Dropdown
                value={data.pais}
                onChange={(e) => handleDropdownChange(e, "pais")}
                options={pais}
                optionLabel="name"
                placeholder="Selecione su pais"
                className="w-full md:w-14rem input"
                required
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
                required
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
                required
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
                required
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
                required
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default FromEstudiante;
