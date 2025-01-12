import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("blogs", "routes/blogs/blogs.layout.tsx", [
    index("routes/blogs/blogs.tsx"),
    route(":blogId", "routes/blogs/blog.tsx"),
  ]),
] satisfies RouteConfig;
