import { createBrowserRouter } from "react-router-dom";

import AdminPage from "../pages/admin/admin.page";
import Matricula from "../pages/admin/matricula/matricula.page";
import ChangePassword from "../pages/auth/change-password/change-password";
import Login from "../pages/auth/login/login.page";
import PrivateRoute from "../pages/PrivateRoute";
import AulaVirtual from "../pages/alumno/aula-virtual/aula";
import AulaVirtualDocente from "../pages/docente/aula-virtual/aula-docente";
import AulaVirtualAlumno from "../pages/alumno/aula-virtual/aula";
import Asistencia from "../pages/docente/aula-virtual/asistencia/asistencia";
import RegistrarDocente from "../pages/admin/docente/registrar-docente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/admin-crayon/",
    element: (
      <PrivateRoute>
        <AdminPage />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin-crayon/registrar-matricula",
        element: (
          <PrivateRoute>
            <Matricula />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-crayon/agregar-docente",
        element: (
          <PrivateRoute>
            <RegistrarDocente />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/aula-virtual",
    element: <AulaVirtualAlumno />,
  },
  {
    path: "/aula-docente",
    element: (
      <PrivateRoute>
        <AulaVirtualDocente />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/aula-docente/registrar-asistencia",
        element: <Asistencia />,
      },
    ],
  },
]);

export default router;
