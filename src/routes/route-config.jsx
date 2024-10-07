import AdminPage from "../pages/admin/admin.page";
import Asistencia from "../pages/docente/aula-virtual/asistencia/asistencia";
import AulaVirtual from "../pages/alumno/aula-virtual/aula";
import AulaVirtualAlumno from "../pages/alumno/aula-virtual/aula";
import AulaVirtualDocente from "../pages/docente/aula-virtual/aula-docente";
import ChangePassword from "../pages/auth/change-password/change-password";
import CuotasLista from "../pages/alumno/aula-virtual/cuotas";
import CuotasListaAdmin from "../pages/admin/cuotas-detalle/cuotas";
import DetalleCuotas from "../pages/admin/cuotas-detalle/cuotas";
import EditarDatosEstudiante from "../pages/admin/matricula/editar-datos-estudiante";
import EditarDocente from "../pages/admin/docente/editar-docente";
import HistorialCuotas from "../pages/alumno/aula-virtual/historial";
import HomePage from "../pages/home";
import ListaAlumnosMatriculados from "../pages/admin/matricula/lista-matricula";
import ListaDocentes from "../pages/admin/docente/lista-docentes";
import Login from "../pages/auth/login/login.page";
import Matricula from "../pages/admin/matricula/matricula.page";
import PrivateRoute from "../pages/PrivateRoute";
import RegistrarDocente from "../pages/admin/docente/registrar-docente";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
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
        path: "/admin-crayon/lista-alumnos",
        element: (
          <PrivateRoute>
            <ListaAlumnosMatriculados />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-crayon/editar-estudiante/:id",
        element: (
          <PrivateRoute>
            <EditarDatosEstudiante />
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
      ,
      {
        path: "/admin-crayon/lista-docente",
        element: (
          <PrivateRoute>
            <ListaDocentes />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-crayon/editar-docente/:id",
        element: (
          <PrivateRoute>
            <EditarDocente />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-crayon/cuotas-detalle",
        element: (
          <PrivateRoute>
            <CuotasListaAdmin />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/aula-virtual",
    element: (
      <PrivateRoute>
        <AulaVirtualAlumno />,
      </PrivateRoute>
    ),
    children: [
      {
        path: "/aula-virtual/cuotas/",
        element: <CuotasLista />,
      },
      {
        path: "/aula-virtual/historial-cuotas/",
        element: <HistorialCuotas />,
      },
    ],
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
