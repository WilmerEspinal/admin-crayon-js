import React, { useRef } from "react";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import FormDocente from "../../../components/form-docente/docente";

import LoginRegister from "../../../components/registrar/registrar";
import { Dropdown } from "primereact/dropdown";

const RegistrarDocente = () => {
  const stepperRef = useRef(null);
  const rol = [{ name: "docente" }];
  return (
    <section>
      <h2>Agregar docente</h2>
      <div className="card flex justify-content-center">
        <form className="" action="">
          <Stepper ref={stepperRef} linear={true}>
            <StepperPanel header="DATOS PERSONALES DEL DOCENTE">
              <div className="flex flex-column h-12rem">
                <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                  <FormDocente />
                </div>
              </div>
              <div className="flex pt-4 justify-content-end container_btns">
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={() => stepperRef.current.nextCallback()}
                />
              </div>
            </StepperPanel>
            <StepperPanel header="CREAR CREDENCIALES DEL DOCENTE">
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
                  <LoginRegister />
                </div>
              </div>
              <div className="flex pt-4 justify-content-start container_btns">
                <Button
                  label="Back"
                  severity="secondary"
                  icon="pi pi-arrow-left"
                  onClick={() => stepperRef.current.prevCallback()}
                />
                <Button label="Crear" severity="primary" />
              </div>
            </StepperPanel>
          </Stepper>
        </form>
      </div>
    </section>
  );
};

export default RegistrarDocente;
