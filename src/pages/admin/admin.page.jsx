import { PanelMenu } from 'primereact/panelmenu';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo/logo-crayon.png';
const AdminPage = () => {
    const navigate = useNavigate();
    const items = [
        {
            label: 'Matriculas',
            icon: 'pi pi-file',
            items: [
                {
                    label: 'Nueva matricula',
                    icon: 'pi pi-file',
                    command: () => navigate('registrar-matricula')

                },
                {
                    label: 'Matriculados',
                    icon: 'pi pi-image',
                }
            ]
        },

    ];
    return (
        <>
            <section className="container_admin">
                <section className="container_nav">
                    <img className='logo_colegio' src={Logo} alt="Logo del colegio" />
                    <PanelMenu model={items} className="w-full md:w-20rem" />
                </section>
                <main>
                    <Outlet />
                </main>
            </section>
        </>
    )
}

export default AdminPage