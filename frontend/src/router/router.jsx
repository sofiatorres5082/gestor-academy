import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../features/dashboard/pages/Dashboard";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
