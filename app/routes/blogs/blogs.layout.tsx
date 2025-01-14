import { Outlet } from "react-router";

const BlogLayout = () => {
  return (
    <div className="space-y-4">
      <Outlet />
    </div>
  );
};

export default BlogLayout;
