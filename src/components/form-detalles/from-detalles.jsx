import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import axios from "axios";

const FormDetalles = ({ data, setData }) => {
  const [grados, setGrados] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState(null);

  const situacion = [
    { label: "Ingresante", value: "Ingresante" },
    { label: "Repitente", value: "Repitente" },
    { label: "Traslado", value: "Traslado" },
  ];

  const handleDropdownChange = (e, fieldName) => {
    setData((prevData) => ({
      ...prevData,
      [fieldName]: e.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          label: grado.descripcion, // Descripción del grado
          value: grado.id, // ID del grado
        }));
        setGrados(formattedGrados);
      })
      .catch((error) => {
        console.error("Error fetching grados:", error);
        if (error.response && error.response.status === 401) {
          console.error("Token inválido o expirado");
        }
      });
  }, []);

  return (
    <>
      <section className="container_inputs_detalles">
        <div>
          <label className="container_inputs">
            Grado
            <Dropdown
              value={data.grado} // Aquí guardas el ID del grado
              onChange={
                (e) =>
                  handleChange({ target: { name: "grado", value: e.value } }) // Guardar el ID del grado
              }
              options={grados}
              optionLabel="label" // Cambia esto a "label" para que muestre la descripción
              placeholder="Seleccionar un grado"
              className="w-full md:w-14rem"
            />
          </label>
        </div>

        <div>
          <label className="container_inputs">
            Situación
            <Dropdown
              value={data.situacion}
              onChange={(e) => handleDropdownChange(e, "situacion")}
              options={situacion}
              optionLabel="label"
              placeholder="Situación del estudiante"
              className="w-full md:w-14rem"
            />
          </label>
        </div>

        <div>
          <label className="container_inputs">
            Costo matrícula
            <InputNumber
              placeholder="S/"
              inputId="currency-us"
              mode="currency"
              currency="PEN"
              locale="es-PE"
              value={data.constoMatricula}
              onChange={(e) =>
                handleChange({ name: "constoMatricula", value: e.value })
              }
            />
          </label>
        </div>
        <div>
          <label className="container_inputs">
            Cuota
            <InputNumber
              placeholder="S/"
              inputId="currency-us"
              mode="currency"
              currency="PEN"
              locale="es-PE"
              value={data.cuota}
              onChange={(e) => handleChange({ name: "cuota", value: e.value })}
            />
          </label>
        </div>
      </section>
    </>
  );
};

export default FormDetalles;
