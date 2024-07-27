import axios from "axios";
import { Button } from "primereact/button";
import { Password } from "primereact/password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [currentPassword, setCurretPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const navigate = useNavigate();

    function handleCurrentPassword(e) {
        setCurretPassword(e.target.value)
    }
    function handleNewPassword(e) {
        setnewPassword(e.target.value)
    }
    function handleRepeatPassword(e) {
        setRepeatPassword(e.target.value)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (newPassword !== repeatPassword) {
            console.log('Las contraseñas no coinciden.');
            return;
        }
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('http://127.0.0.1:8000/api/change-password', {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: repeatPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            navigate('/');

        } catch (error) {
            console.log('Error al cambiar la contraseña, por favor verifica los datos.');

        }
    }

    return (
        <section className="container_login">
            <h2>Debes cambiar tu contraseña actual</h2>
            <form onSubmit={handleSubmit} action="">
                <div className="">
                    <label className='label_input' >Contraseña actual
                        <Password toggleMask placeholder='ingrese su contraseña actual'
                            feedback={false}
                            value={currentPassword}
                            onChange={handleCurrentPassword}
                            name="current_password"
                        />
                    </label>
                </div>
                <div className="">
                    <label className='label_input' >Nueva contraseña
                        <Password toggleMask placeholder='Cree una nueva contraseña'
                            feedback={false}
                            value={newPassword}
                            onChange={handleNewPassword}
                            name="new_password"
                        />
                    </label>
                </div>
                <div className="">
                    <label className='label_input' >Repita la contraseña
                        <Password toggleMask placeholder='Repita la contraseña'
                            feedback={false}
                            value={repeatPassword}
                            onChange={handleRepeatPassword}
                            name="new_password_confirmation"
                        />
                    </label>
                </div>
                <Button type="submit">Cambiar</Button>
            </form>
        </section>
    )
}

export default ChangePassword
