import { ReactNode } from "react";

interface IChildren {
  children: ReactNode;
}

const Layout = ({ children }: IChildren) => {
  return <div className="max-w-[1200px] w-full mx-auto">{children}</div>;
};

export default Layout;
