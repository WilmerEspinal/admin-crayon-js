import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';



const FromEstudiante = () => {
    const [date, setDate] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectCountry, setselectCountry] = useState(null)
    const generos = [
        { name: 'Mujer' },
        { name: 'Hombre' }

    ];

    const pais = [
        { name: 'Perú' },
    ]

    return (
        <>
            <div className="flex flex-column h-12rem">
                <div className="container_inputs_estudiantes">
                    <div>
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
                        <label className="container_inputs">F.N
                            <Calendar placeholder='MM/DD/YYYY' value={date} onChange={(e) => setDate(e.value)} />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Sexo
                            <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={generos} optionLabel="name"
                                placeholder="Selecione su genero" className="w-full md:w-14rem" />

                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Lengua Materna
                            <InputText />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Sengunda Lengua
                            <InputText />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Lugar de nacimiento
                            <InputText />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Pais
                            <Dropdown value={selectCountry} onChange={(e) => setselectCountry(e.value)} options={pais} optionLabel="name"
                                placeholder="Selecione su pais" className="w-full md:w-14rem" />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Religión
                            <InputText />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Departamento
                            <InputText />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Provincia
                            <InputText />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Distrito
                            <InputText />
                        </label>
                    </div>
                    <div>
                        <label className="container_inputs">Correo electronico
                            <InputText type='email' placeholder='ejemplo@gmail.com' />
                        </label>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FromEstudiante