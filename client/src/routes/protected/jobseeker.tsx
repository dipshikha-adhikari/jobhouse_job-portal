import { lazy } from "react";
const JobseekerRoutes = lazy(() =>
  import("../../features/profiles/jobseeker/routes").then((module) => {
    return { default: module.JobseekerRoutes };
  })
);

export const protectedJobseekerRoutes = [
  {
    path: "/jobseeker/*",
    element: <JobseekerRoutes />,
  },
];
