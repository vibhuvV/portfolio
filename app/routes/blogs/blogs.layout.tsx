import { Outlet } from "react-router";

const BlogLayout = () => {
  return (
    <div className="space-y-10">
      <Outlet />
    </div>
  );
};

export default BlogLayout;
