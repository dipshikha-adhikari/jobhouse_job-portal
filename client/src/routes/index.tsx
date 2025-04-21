import { useRoutes } from "react-router-dom";
import { useCurrentUser } from "../features/auth/api/getUser";
import useAuthStore from "../store/auth";
import { protectedEmployerRoutes } from "./protected/employer";
import { protectedJobseekerRoutes } from "./protected/jobseeker";
import { publicRoutes } from "./public";
import Home from "../features/home/routes/Home";
import PageNotFound from "../features/home/routes/PageNotFound";

export const AppRoutes = () => {
  const { isAunthenticated } = useAuthStore();
  const { role } = useCurrentUser();

  const commonRoutes = [
    { path: "/", element: <Home /> },
    { path: "*", element: <PageNotFound /> },
  ];

  let routes: any = [];

  if (isAunthenticated && role === "jobseeker") {
    routes = protectedJobseekerRoutes;
  } else if (isAunthenticated && role === "employer") {
    routes = protectedEmployerRoutes;
  } else {
    routes = [];
  }

  const element = routes.length
    ? useRoutes([...routes, ...commonRoutes, ...publicRoutes])
    : useRoutes([...commonRoutes, ...publicRoutes]);

  return <>{element}</>;
};
