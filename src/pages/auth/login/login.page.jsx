import axios from 'axios';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    // const [data, setData] = useState(null);


    function handlerEmail(e) {
        setEmail(e.target.value)
    }
    function handlePassword(e) {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password })
            if (response.data.error) {
                setError(response.data.error)
            } else {
                const { token, requirePasswordChange } = response.data
                if (requirePasswordChange) {
                    localStorage.setItem('token', token)
                    navigate('/change-password')
                } else {
                    localStorage.setItem('token', token);
                    navigate('/admin-crayon')
                }
            }
            // setData(response.data);
        } catch (error) {
            console.error('Error en el login', error);
            if (error.response && error.response.status === 404) {
                setError('Usuario no encontrado');
                // switch (error.response.data) {
                //     case 422:
                //         setError('La contraseña debe tener 8 caracteres')
                //         break;
                //     case 400:
                //         setError('La contraseña ingresada no existe')
                //         break
                //     case 404:
                //         setError(response.data.response)
                //         break
                // }
            } else if (error.response && error.response.status === 400) {
                setError('La contraseña es incorrecta');
            }
        }
    }

    return (
        <>
            <section className="container_login">
                <form onSubmit={handleSubmit} action="">
                    <div className="">
                        <label className='label_input' >email
                            <InputText type='email' placeholder='ingrese su email' required
                                value={email}
                                onChange={handlerEmail}
                                name='email'
                            />
                        </label>

                    </div>
                    <div className="">
                        <label className='label_input' >Contraseña
                            <Password toggleMask placeholder='ingrese su contraseña'
                                feedback={false}
                                value={password}
                                onChange={handlePassword}
                                name='password'
                            />

                        </label>
                    </div>
                    {error && <p className='text_error'>{error}</p>}
                    <Button type='submit'>Ingresar</Button>
                </form>
            </section>
        </>
    )
}

export default Login