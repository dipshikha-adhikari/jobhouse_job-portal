import { Route, Routes } from "react-router-dom";
import PublicProfile from "../../profiles/employer/routes/PublicProfile";
import Job from "./JobDetails";
import Jobs from "./Jobs";
import SearchResults from "./SearchResults";
import { MainLayout } from "../../../components/layout";

export const JobsPublicRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="" element={<Jobs />} />
        <Route path="/employer/:employerName/:id" element={<PublicProfile />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/:jobId" element={<Job />} />
        <Route path="*" element={<Jobs />} />
      </Routes>
    </MainLayout>
  );
};
