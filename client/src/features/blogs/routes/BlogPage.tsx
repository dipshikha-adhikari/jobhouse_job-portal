import { useEffect } from "react";

const BlogPage = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className="min-h-screen text-center py-md">
      Sorry! blog is not available right now. It will be available soon.
    </div>
  );
};

export default BlogPage;
