import React, { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import FormDocente from "../../../components/form-docente/docente";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import axios from "axios";

const RegistrarDocente = () => {
  const stepperRef = useRef(null);

  const [docenteData, setDocenteData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    date: null,
    departamento: "",
    provincia: "",
    distrito: "",
    email: "",
    dni: "",
    direccion: "",
    telefono: "",
    selectedCourseIds: [],
  });

  const handleSubmitDocente = async (e) => {
    e.preventDefault();

    try {
      const data = {
        nombre: docenteData.nombres,
        ap_paterno: docenteData.apellidoPaterno,
        ap_materno: docenteData.apellidoMaterno,
        direccion: docenteData.direccion,
        telefono: docenteData.telefono,
        fecha_nacimiento: docenteData.date
          ? docenteData.date.toISOString().split("T")[0]
          : null,
        departamento: docenteData.departamento,
        provincia: docenteData.provincia,
        distrito: docenteData.distrito,
        dni: docenteData.dni,
        email: docenteData.email,
        cursos: docenteData.selectedCourseIds,
      };

      const token = localStorage.getItem("token");
      const url = "http://127.0.0.1:8000/api/registrar-docente";
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Datos enviados correctamente:", response.data);
    } catch (error) {
      console.error(
        "Error al enviar los datos:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <section>
      <h2 className="container_lista_docente">Agregar docente</h2>
      <div className="card flex justify-content-center">
        <form className="" onSubmit={handleSubmitDocente}>
          <Stepper ref={stepperRef} linear={true}>
            <StepperPanel header="DATOS PERSONALES DEL DOCENTE">
              <div className="flex flex-column h-12rem">
                <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                  <FormDocente data={docenteData} setData={setDocenteData} />
                </div>
              </div>
              <div className="flex pt-4 justify-content-end container_btns">
                <Button label="Agregar" type="submit" />
              </div>
            </StepperPanel>
          </Stepper>
        </form>
      </div>
    </section>
  );
};

export default RegistrarDocente;
