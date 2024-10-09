import { createBrowserRouter } from "react-router-dom";
import { Dashboard } from "../pages/dashboard"
import { DashboardTemplate } from "../template/dashboard"

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <DashboardTemplate />,
        children: [
            {
              path: "/dashboard",
              element: <Dashboard />,
            },
        ],
    },
    {
      path: "*",
      element: (
        <div>
          <h1>Página não encontrada</h1>
        </div>
      ),
    },
  ]);