import { lazy } from "react";
const EmployerRoutes = lazy(() =>
  import("../../features/profiles/employer/routes").then((module) => {
    return { default: module.EmployerRoutes };
  })
);

export const protectedEmployerRoutes = [
  {
    path: "/employer/*",
    element: <EmployerRoutes />,
  },
];
