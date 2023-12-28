import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/navbar";
import { ReactNode } from "react";
import Home from "./pages/home";
import EmployerRegister from "./components/forms/EmployerRegister";
import Login from "./pages/login";
import Footer from "./components/footer";
import Profile from "./pages/jobseeker/Profile";
import EditProfile from "./pages/jobseeker/edit-profile";
import JobseekerRegister from "./components/forms/JobseekerRegister";
import EmployerOverview from "./pages/employer/Overview";
import WrongRoute from "./components/shared/WrongRoute";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import Job from "./pages/jobs/JobDetails";
import EmployerProfile from "./pages/employer/Profile";
import EditEmployerProfile from "./pages/employer/edit-profile";
import CreateJob from "./pages/jobs/CreateJob";
import Jobs from "./pages/jobs";
import ProfileReview from "./pages/jobseeker/ProfileReview";
import EmployerProfileView from "./pages/EmployerProfile";
import JobseekerOverview from "./pages/jobseeker/overview/index";
import SearchResults from "./pages/SearchResults";

export const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

const Root = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <Layout>
        <div className="py-[12vh] relative">
          <Outlet />
        </div>
      </Layout>
      <Footer />
    </>
  );
};
const router = createBrowserRouter([
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
        element: <Profile />,
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
        element: <WrongRoute />,
      },
    ],
  },
]);

type ChildrenProps = {
  children: ReactNode;
};

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className=" w-full max-w-[1500px] mx-auto px-3 lg:px-5 relative">
      {children}
    </div>
  );
};

export default App;
