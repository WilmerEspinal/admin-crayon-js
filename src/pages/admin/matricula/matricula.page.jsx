import { Button } from "primereact/button";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { useRef, useState } from "react";
import FormDetalles from "../../../components/form-detalles/from-detalles";
import FromEstudiante from "../../../components/form-estudiante/form-estudiante";
import FormPadre from "../../../components/from-padres/form-padre";
import LoginRegister from "../../../components/registrar/registrar";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

const Matricula = () => {
  const rol = [{ name: "alumno" }];
  // Declaración del estado para los datos del estudiante
  const [estudianteData, setEstudianteData] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    date: null,
    departamento: "",
    provincia: "",
    distrito: "",
    correoElectronico: "",
    dni: "",
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

  const [detallesMatriculaData, setdetallesMatriculaData] = useState({
    // nivel: null,
    grado: "",
    situacion: "",
    // procedencia: null,
    // idProcedencia: "",
    constoMatricula: undefined,
    cuota: undefined,
  });

  const stepperRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const data = {
        nombre: estudianteData.nombres,
        dni: estudianteData.dni,
        ap_paterno: estudianteData.apellidoPaterno,
        ap_materno: estudianteData.apellidoMaterno,
        direccion: estudianteData.direccion, // Ensure this field exists in your form
        telefono: estudianteData.telefono, // Ensure this field exists in your form
        fecha_nacimiento: estudianteData.date
          ? estudianteData.date.toISOString().split("T")[0]
          : null,
        departamento: estudianteData.departamento,
        pais: "Perú", // Assuming you want to set a default value
        provincia: estudianteData.provincia,
        distrito: estudianteData.distrito,
        nombre_padre: padreData.nombres,
        dni_padre: padreData.dni,
        ap_paterno_padre: padreData.apellidoPaterno,
        ap_materno_padre: padreData.apellidoMaterno,
        direccion_padre: padreData.direccion, // Ensure this field exists in your form
        telefono_padre: padreData.telefono,
        fecha_nacimiento_padre: padreData.date
          ? padreData.date.toISOString().split("T")[0]
          : null,
        nombre_madre: madreData.nombres,
        dni_madre: madreData.dni,
        ap_paterno_madre: madreData.apellidoPaterno,
        ap_materno_madre: madreData.apellidoMaterno,
        direccion_madre: madreData.direccion, // Ensure this field exists in your form
        telefono_madre: madreData.telefono,
        fecha_nacimiento_madre: madreData.date
          ? madreData.date.toISOString().split("T")[0]
          : null,
        costo_matricula: detallesMatriculaData.constoMatricula,
        cuota: detallesMatriculaData.cuota,
        situacion: detallesMatriculaData.situacion,
        id_grado: detallesMatriculaData.grado,
      };

      const token = localStorage.getItem("token"); // Assuming you have a token for authentication

      const response = await axios.post(
        "http://127.0.0.1:8000/api/datos-estudiante",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Data submitted successfully:", response.data);
      // Optionally, you can reset the forms or navigate to another page
    } catch (error) {
      console.error(
        "Error submitting data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <section>
      <h2>Nueva Matricula</h2>
      <div className="card flex justify-content-center container_matricula">
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
                <FormDetalles
                  data={detallesMatriculaData}
                  setData={setdetallesMatriculaData}
                />
              </div>
            </div>

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

          <StepperPanel header="REGISTRAR">
            <div className="flex flex-column h-12rem">
              <div className="form_register border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                <label className="label_input">
                  Rol
                  <Dropdown
                    value={rol[0]}
                    onChange={(e) => handleDropdownChange(e)}
                    options={rol}
                    optionLabel="name"
                    placeholder="Selecione su rol"
                    className="w-full md:w-14rem input"
                  />
                </label>
                <Button label="Matricular" onClick={handleSubmit} />
              </div>
            </div>

            <div className="container_btns">
              <Button
                label="Back"
                severity="secondary"
                icon="pi pi-arrow-left"
                onClick={() => stepperRef.current.prevCallback()}
              />
            </div>
          </StepperPanel>
        </Stepper>
      </div>
    </section>
  );
};

export default Matricula;
