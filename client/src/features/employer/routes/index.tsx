import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../../components/layout";
import CreateJob from "../../jobs/components/CreateJob";
import JobseekerPublicProfile from "../../jobseeker/routes/JobseekerPublicProfile";
import Applications from "./Applications";
import Overview from "./Overview";
import PrivateProfile from "./PrivateProfile";
import UpdateProfile from "./UpdateProfile";
import PageNotFound from "../../misc/routes/PageNotFound";

export const EmployerRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/jobs/applications/:jobId" element={<Applications />} />
        <Route path="/jobs/create" element={<CreateJob />} />
        <Route
          path="/jobs/applicant/:applicantId"
          element={<JobseekerPublicProfile />}
        />
        <Route path="/jobs/update/:jobId" element={<CreateJob />} />
        <Route path="/profile" element={<PrivateProfile />} />
        <Route path="/profile/:title" element={<UpdateProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MainLayout>
  );
};
