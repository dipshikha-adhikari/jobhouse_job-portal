import { Suspense, lazy } from "react"
import { Toaster } from "react-hot-toast";
import { Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "./App";
import Footer from "./components/footer";
import Loader from './components/shared/Loader';
import Navbar from "./components/navbar";
import Home from "./pages/home";
const EmployerRegister = lazy(( ) =>import("./components/forms/EmployerRegister"))
const JobseekerRegister = lazy(( ) =>import("./components/forms/JobseekerRegister"))
const PageNotFound = lazy(( ) =>import("./components/shared/PageNotFound"))
const EmployerProfileView = lazy(( ) =>import("./pages/EmployerProfile"))
const JobseekerProfileView = lazy(( ) =>import("./pages/JobseekerProfile"))
const SearchResults = lazy(( ) =>import("./pages/SearchResults"))
const Applications = lazy(( ) =>import("./pages/employer/Applications"))
const EmployerOverview = lazy(( ) =>import("./pages/employer/Overview"))
const EmployerProfile = lazy(( ) =>import("./pages/employer/Profile"))
const EditEmployerProfile = lazy(( ) =>import("./pages/employer/edit-profile"))
const Jobs = lazy(( ) =>import("./pages/jobs"))
const CreateJob = lazy(( ) =>import("./pages/jobs/CreateJob"))
const Job = lazy(( ) =>import("./pages/jobs/JobDetails"))
const JobseekerProfile = lazy(( ) =>import("./pages/jobseeker/Profile"))
const ProfileReview = lazy(( ) =>import("./pages/jobseeker/ProfileReview"))
const EditProfile = lazy(( ) =>import("./pages/jobseeker/edit-profile"))
const JobseekerOverview = lazy(( ) =>import("./pages/jobseeker/overview/index"))
const Login = lazy(( ) =>import("./pages/login"))

const Root = () => {
    return (
      <>
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        <Layout>
          <div className=" py-[10vh]  min-h-screen relative">
      <Suspense fallback={<Loader/>}>
      <Outlet />
      </Suspense>
          </div>
        </Layout>
        <Footer />
      </>
    )
  }
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader:() => <div>Loading...</div>,
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
  ])
