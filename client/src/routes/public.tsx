import { lazy } from "react";
import { BlogsRoutes } from "../features/blogs";
import { JobsPublicRoutes } from "../features/jobs/routes";
import PublicProfile from "../features/employer/routes/PublicProfile";
import { MainLayout } from "../components/layout";
import PageNotFound from "../features/misc/routes/PageNotFound";

const AuthRoutes = lazy(() =>
  import("../features/auth/routes/index").then((module) => {
    return { default: module.AuthRoutes };
  })
);

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
  {
    path: "/jobs/*",
    element: <JobsPublicRoutes />,
  },
  {
    path: "/blogs/*",
    element: <BlogsRoutes />,
  },
  {
    path: "/faqs/*",
    element: (
      <MainLayout>
        <PageNotFound />
      </MainLayout>
    ),
  },
  {
    path: "/employers/:employerName/:id",
    element: (
      <MainLayout>
        <PublicProfile />
      </MainLayout>
    ),
  },
];
