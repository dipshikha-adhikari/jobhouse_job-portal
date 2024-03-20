import { lazy } from "react";

const JobseekerRoutes = lazy(() =>
  import("../../features/jobseeker/routes").then((module) => {
    return { default: module.JobseekerRoutes };
  })
);

//routes followed by jobseeker are private and only jobseeker can view that.

export const protectedJobseekerRoutes = [
  {
    path: "/jobseeker/*",
    element: <JobseekerRoutes />,
  },
];
