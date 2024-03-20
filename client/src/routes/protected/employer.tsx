import { lazy } from "react";
import PageNotFound from "../../features/misc/routes/PageNotFound";

const EmployerRoutes = lazy(() =>
  import("../../features/employer/routes").then((module) => {
    return { default: module.EmployerRoutes };
  })
);

export const protectedEmployerRoutes = [
  {
    path: "/employer/*",
    element: <EmployerRoutes />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
