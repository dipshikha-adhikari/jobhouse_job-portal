import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./RouterConfig";

export const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }
});

type ChildrenProps = {
  children: ReactNode;
};

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <div className=" w-full max-w-[1400px] mx-auto px-md   relative">
      {children}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};



export default App;
