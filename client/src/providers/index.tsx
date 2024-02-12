import { Suspense } from "react";
import Loader from "../components/elements/loader/Loader";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../lib/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Loader />
        </div>
      }
    >
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <Router>{children}</Router>
      </QueryClientProvider>
    </Suspense>
  );
};
