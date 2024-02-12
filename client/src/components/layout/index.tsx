import ContentLayout from "./ContentLayout";
import Footer from "./footer";
import Navbar from "./navbar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="pt-[10vh] sm:pt-[12vh]">
        <ContentLayout>{children}</ContentLayout>
      </div>
      <Footer />
    </>
  );
};
