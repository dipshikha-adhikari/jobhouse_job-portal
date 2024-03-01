import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../../components/layout";
import PageNotFound from "../../misc/routes/PageNotFound";
import EditProfile from "./EditProfile";
import JobseekerPrivateProfile from "./JobseekerPrivateProfile";
import JobseekerOverview from "./Overview";
import ProfileReview from "./ProfileReview";

export const JobseekerRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/profile" element={<JobseekerPrivateProfile />} />
        <Route path="/profile/:title" element={<EditProfile />} />
        <Route path="/overview" element={<JobseekerOverview />} />
        <Route
          path="apply/process/:jobTitle/:jobId"
          element={<ProfileReview />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </MainLayout>
  );
};
