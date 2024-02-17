import { useEffect } from "react";

export const ScrollToTop = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return null;
};
