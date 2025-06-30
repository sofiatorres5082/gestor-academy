import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../features/dashboard/pages/Dashboard";
import NotFound from "../pages/NotFound";
import SociosPage from "../features/socios/pages/SociosPage";
import TalleresPage from "../features/talleres/pages/TalleresPage";
import InscripcionesPage from "../features/inscripciones/pages/InscripcionesPage";
import PrivateRoute from "../components/PrivateRoute";
import LoginPage from "../features/auth/pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <PrivateRoute />, 
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "socios", element: <SociosPage /> },
          { path: "talleres", element: <TalleresPage /> },
          { path: "inscripciones", element: <InscripcionesPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
