import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";

const FormDetalles = () => {
  const [nivelSelecionado, setnivelSelecionado] = useState(null);

  const [gradoSelecionado, setgradoSelecionado] = useState(null);
  const [situacionSelecionado, setsituacionSelecionado] = useState(null);
  const [procedenciaSelecionado, setprocedenciaSelecionado] = useState(null);
  const [constoMatricula, setconstoMatricula] = useState("");
  const [constoMensualidad, setconstoMensualidad] = useState("");
  const niveles = [{ name: "secundaria" }];

  const grado = [
    { name: "1ro" },
    { name: "2do" },
    { name: "3ro" },
    { name: "4to" },
    { name: "5to" },
  ];

  const situacion = [
    { name: "Ingresante" },
    { name: "Repitente" },
    { name: "Promovido" },
  ];

  const procedencia = [
    { name: "misma institución" },
    { name: "otra institución" },
  ];

  return (
    <>
      <section className="container_inputs_detalles">
        <div>
          <label className="container_inputs">
            Nivel
            <Dropdown
              value={nivelSelecionado}
              onChange={(e) => setnivelSelecionado(e.value)}
              options={niveles}
              optionLabel="name"
              placeholder="Selecionar nivel"
              className="w-full md:w-14rem"
            />
          </label>
        </div>

        <div>
          <label className="container_inputs">
            Grado
            <Dropdown
              value={gradoSelecionado}
              onChange={(e) => setgradoSelecionado(e.value)}
              options={grado}
              optionLabel="name"
              placeholder="Selecionar un grado"
              className="w-full md:w-14rem"
            />
          </label>
        </div>

        <div>
          <label className="container_inputs">
            Situacion
            <Dropdown
              value={situacionSelecionado}
              onChange={(e) => setsituacionSelecionado(e.value)}
              options={situacion}
              optionLabel="name"
              placeholder="Situación del estudiante"
              className="w-full md:w-14rem"
            />
          </label>
        </div>

        <div>
          <label className="container_inputs">
            Procedencia
            <Dropdown
              value={procedenciaSelecionado}
              onChange={(e) => setprocedenciaSelecionado(e.value)}
              options={procedencia}
              optionLabel="name"
              placeholder="Selecionar una procedencia"
              className="w-full md:w-14rem"
            />
          </label>
        </div>
        <div>
          <label className="container_inputs">
            Id procedencia
            <InputText
              className="input"
              name="nombre del colegio"
              placeholder="nombre del colegio"
            />
          </label>
        </div>
        <div>
          <label className="container_inputs">
            Costo matricula
            <InputNumber
              placeholder="S/"
              inputId="currency-us"
              value={constoMatricula}
              onValueChange={(e) => setconstoMatricula(e.value)}
              mode="currency"
              currency="PEN"
              locale="es-PE"
            />
          </label>
        </div>
        <div>
          <label className="container_inputs">
            Mensualidad
            <InputNumber
              placeholder="S/"
              inputId="currency-us"
              value={constoMensualidad}
              onValueChange={(e) => setconstoMensualidad(e.value)}
              mode="currency"
              currency="PEN"
              locale="es-PE"
            />
          </label>
        </div>
      </section>
    </>
  );
};

export default FormDetalles;
