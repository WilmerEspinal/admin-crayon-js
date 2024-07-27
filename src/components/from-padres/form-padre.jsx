import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

const FormPadre = () => {
    const [date, setDate] = useState(null);
    return (
        <>
            <div className="inputs_datos_familia">
                <div className="">
                    <label className="label_input_dni">DNI
                        <span className='container_input_dni'>
                            <InputText className='input_dni' type="number" placeholder='65374653' />
                            <Button>Buscar</Button>
                        </span>
                    </label>
                </div>

                <div>
                    <label className="container_inputs">Apellido Paterno
                        <InputText placeholder='Ingrese su apellido' />
                    </label>
                </div>
                <div>
                    <label className="container_inputs">Apellido Materno
                        <InputText placeholder='Ingrese su apellido' />
                    </label>
                </div>

                <div>
                    <label className="container_inputs">Nombres
                        <InputText placeholder='Ingrese su nombre' />
                    </label>
                </div>

                <div>
                    <label className="container_inputs" >F.N
                        <Calendar placeholder='MM/DD/YYYY' value={date} onChange={(e) => setDate(e.value)} />
                    </label>
                </div>
                <div>
                    <label className="container_inputs" >Email
                        <InputText type='email' placeholder='ejemplo@gmail.com' />
                    </label>
                </div>
                <div>
                    <label className="container_inputs" >Celular
                        <InputText type='number' placeholder='987654321' />
                    </label>
                </div>
            </div>
        </>
    )
}

export default FormPadre