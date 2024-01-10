import { Toaster } from "react-hot-toast";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "./App";
import Footer from "./components/footer";
import EmployerRegister from "./components/forms/EmployerRegister";
import JobseekerRegister from "./components/forms/JobseekerRegister";
import Navbar from "./components/navbar";
import PageNotFound from "./components/shared/PageNotFound";
import EmployerProfileView from "./pages/EmployerProfile";
import JobseekerProfileView from "./pages/JobseekerProfile";
import SearchResults from "./pages/SearchResults";
import Applications from "./pages/employer/Applications";
import EmployerOverview from "./pages/employer/Overview";
import EmployerProfile from "./pages/employer/Profile";
import EditEmployerProfile from "./pages/employer/edit-profile";
import Home from "./pages/home";
import Jobs from "./pages/jobs";
import CreateJob from "./pages/jobs/CreateJob";
import Job from "./pages/jobs/JobDetails";
import JobseekerProfile from "./pages/jobseeker/Profile";
import ProfileReview from "./pages/jobseeker/ProfileReview";
import EditProfile from "./pages/jobseeker/edit-profile";
import JobseekerOverview from "./pages/jobseeker/overview/index";
import Login from "./pages/login";


const Root = () => {
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Layout>
          <div className=" py-[10vh] relative">
            <Outlet />
          </div>
        </Layout>
        <Footer />
      </>
    );
  };

  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/jobseeker/overview",
          element: <JobseekerOverview />,
        },
        {
          path: "/jobseeker/register",
          element: <JobseekerRegister />,
        },
        {
          path: "/employer/register",
          element: <EmployerRegister />,
        },
        {
          path: "/user/login",
          element: <Login />,
        },
        {
          path: "/jobseeker/profile",
          element: <JobseekerProfile />,
        },
        {
          path: "/applicant/profile/:id",
          element: <JobseekerProfileView />,
        },
        {
          path: "/jobseeker/apply/process/:jobTitle/:jobId",
          element: <ProfileReview />,
        },
        {
          path: "/employer/profile",
          element: <EmployerProfile />,
        },
        {
          path: "/employer/:employerName/:id",
          element: <EmployerProfileView />,
        },
        {
          path: "/jobseeker/profile/:title",
          element: <EditProfile />,
        },
        {
          path: "/employer/profile/:title",
          element: <EditEmployerProfile />,
        },
        {
          path: "/employer/overview",
          element: <EmployerOverview />,
        },
        {
          path: "/employer/jobs/applications/:jobId",
          element: <Applications />,
        },
        {
          path: "/jobs/:jobTitle/:jobId",
          element: <Job />,
        },
        {
          path: "/jobs/create",
          element: <CreateJob />,
        },
        {
          path: "/jobs",
          element: <Jobs />,
        },
        {
          path: "/jobs/update/:jobId",
          element: <CreateJob />,
        },
        {
          path: "/jobs/search",
          element: <SearchResults />,
        },
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ]);