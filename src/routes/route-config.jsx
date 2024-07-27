import {
    createBrowserRouter
} from "react-router-dom";

import AdminPage from "../pages/admin/admin.page";
import Matricula from "../pages/admin/matricula/matricula.page";
import ChangePassword from "../pages/auth/change-password/change-password";
import Login from "../pages/auth/login/login.page";
import PrivateRoute from "../pages/PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/change-password",
        element: <ChangePassword />
    },
    {
        path: '/admin-crayon/',
        element:
            (
                <PrivateRoute>
                    <AdminPage />
                </PrivateRoute>
            ),
        children: [
            {
                path: '/admin-crayon/registrar-matricula',
                element:
                    (
                        <PrivateRoute>
                            <Matricula />
                        </PrivateRoute>
                    ),
            }
        ]
    }
]);

export default router