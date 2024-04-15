import { Route, Routes } from "react-router-dom";
import Register from "../../../components/elements/modals/Register";
import Login from "./Login";
import { MainLayout } from "../../../components/layout";
import EmployerRegisterForm from "../../../components/forms/EmployerRegister";
import JobseekerRegisterForm from "../../../components/forms/JobseekerRegister";

export const AuthRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="employer/register" element={<EmployerRegisterForm />} />
        <Route path="jobseeker/register" element={<JobseekerRegisterForm />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </MainLayout>
  );
};
