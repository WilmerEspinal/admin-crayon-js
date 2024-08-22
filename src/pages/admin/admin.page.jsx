import { PanelMenu } from "primereact/panelmenu";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import axios from "axios";
import Logo from "../../assets/images/logo/logo-crayon.png";

const AdminPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const items = [
    {
      label: "Matriculas",
      icon: "pi pi-file",
      items: [
        {
          label: "Nueva matricula",
          icon: "pi pi-file",
          command: () => navigate("registrar-matricula"),
        },
        {
          label: "Matriculados",
          icon: "pi pi-image",
        },
      ],
    },
  ];

  const itemDocente = [
    {
      label: "Docentes",
      icon: "pi pi-file",
      items: [
        {
          label: "Agregar docente",
          icon: "pi pi-file",
          command: () => navigate("agregar-docente"),
        },
        {
          label: "Lista docentes",
          icon: "pi pi-image",
        },
      ],
    },
  ];

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserName(response.data.name);
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    obtenerUsuario();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/"); // Redirige a la página de inicio de sesión o cualquier otra página deseada
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <>
      <section className="container_admin">
        <section className="container_nav">
          <div>
            <img className="logo_colegio" src={Logo} alt="Logo del colegio" />
            <PanelMenu model={items} className="w-full md:w-20rem" />
            <PanelMenu model={itemDocente} className="w-full md:w-20rem" />
          </div>

          <div className="container_user_name">
            <h2 className="">{userName}</h2>
            <p>{userRole}</p>
            <Button onClick={handleLogout} label="Salir" severity="danger" />
          </div>
        </section>
        <main>
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default AdminPage;
