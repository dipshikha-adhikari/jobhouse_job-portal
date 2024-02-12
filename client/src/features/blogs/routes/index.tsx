import { Navigate, Route, Routes } from "react-router-dom";
import Blogs from "../components/Blogs";
import BlogPage from "./BlogPage";
import { MainLayout } from "../../../components/layout";

export const BlogsRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="" element={<Blogs />} />
        <Route path=":blogTitle" element={<BlogPage />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>
    </MainLayout>
  );
};
