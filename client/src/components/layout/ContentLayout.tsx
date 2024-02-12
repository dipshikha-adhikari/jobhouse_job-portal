import React from "react";
type ContentLayout = {
  children: React.ReactNode;
};

const ContentLayout = ({ children }: ContentLayout) => {
  return (
    <div className="max-w-[1400px] mx-auto p-xs px-sm md:px-md">{children}</div>
  );
};

export default ContentLayout;
