import { useRoutes } from "react-router-dom";
import { useCurrentUser } from "../features/auth/api/getUser";
import Landing from "../features/misc/routes/Landing";
import useAuthStore from "../store/auth";
import { protectedEmployerRoutes } from "./protected/employer";
import { protectedJobseekerRoutes } from "./protected/jobseeker";
import { publicRoutes } from "./public";
import PageNotFound from "../features/misc/routes/PageNotFound";
import { MainLayout } from "../components/layout";

export const AppRoutes = () => {
  const { isAunthenticated } = useAuthStore();
  const { role } = useCurrentUser();

  const commonRoutes = [
    { path: "/", element: <Landing /> },
    {
      path: "*",
      element: (
        <MainLayout>
          <PageNotFound />{" "}
        </MainLayout>
      ),
    },
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
