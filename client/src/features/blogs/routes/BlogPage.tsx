import { useEffect } from "react";

const BlogPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-center py-md">
      This page is under construction.
    </div>
  );
};

export default BlogPage;
