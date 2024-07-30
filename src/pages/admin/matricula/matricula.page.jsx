import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import React, { useRef, useState } from "react";
import FormDetalles from "../../../components/form-detalles/from-detalles";
import FromEstudiante from "../../../components/form-estudiante/form-estudiante";
import FormPadre from "../../../components/from-padres/form-padre";

const Matricula = () => {
  // Declaración del estado para los datos del estudiante
  const [estudianteData, setEstudianteData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    date: null,
    selectedCity: null,
    selectCountry: null,
    dni: "",
    lenguaMaterna: "",
    segundaLengua: "",
    lugarNacimiento: "",
    religion: "",
    departamento: "",
    provincia: "",
    distrito: "",
    correoElectronico: "",
  });

  const [padreData, setPadreData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    date: null,
    telefono: "",
    email: "",
    dni: "",
  });

  const [madreData, setMadreData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    date: null,
    telefono: "",
    email: "",
    dni: "",
  });

  const stepperRef = useRef(null);

  return (
    <section>
      <h2>Nueva Matricula</h2>
      <div className="card flex justify-content-center">
        <Stepper ref={stepperRef} linear={true}>
          <StepperPanel header="DATOS PERSONALES DEL ESTUDIANTE">
            <FromEstudiante data={estudianteData} setData={setEstudianteData} />
            <div className="container_btns">
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="DATOS DEL PADRE DE FAMILIA">
            <section>
              <h1>Padre</h1>
              <FormPadre data={padreData} setData={setPadreData} />
            </section>
            <section>
              <h1>Madre</h1>
              <FormPadre data={madreData} setData={setMadreData} />
            </section>
            <div className="container_btns">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button
                label="Next"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={() => stepperRef.current.nextCallback()}
              />
            </div>
          </StepperPanel>
          <StepperPanel header="DETALLES DE LA MATRICULA">
            <div className="flex flex-column h-12rem">
              <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                <FormDetalles />
              </div>
            </div>
            <div className="container_btns">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
              <Button>Matricular</Button>
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </section>
  );
};

export default Matricula;
