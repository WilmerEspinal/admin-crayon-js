import { Button } from 'primereact/button';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import React, { useRef } from "react";
import FromEstudiante from '../../../components/form-estudiante/form-estudiante';
import FormPadre from '../../../components/from-padres/form-padre';


const Matricula = () => {

    const stepperRef = useRef(null);

    return (
        <section>
            <h2>Nueva Matricula</h2>
            <div className="card flex justify-content-center">
                <Stepper ref={stepperRef} linear={true}>
                    <StepperPanel header="DATOS PERSONALES DEL ESTUDIANTE">
                        <FromEstudiante />
                        <div className="container_btns">
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="DATOS DEL PADRE DE FAMILIA">

                        <section>
                            <h1>Padre</h1>
                            <FormPadre />
                        </section>
                        <section>
                            <h1>Madre</h1>
                            <FormPadre />
                        </section>

                        <div className="container_btns">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
                        </div>
                    </StepperPanel>
                    <StepperPanel header="DETALLES DE LA MATRICULA">
                        <div className="flex flex-column h-12rem">
                            <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
                        </div>
                        <div className="container_btns">
                            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
                            <Button>Matricular</Button>
                        </div>
                    </StepperPanel>
                </Stepper>
            </div>
        </section>
    );
};

export default Matricula;
