import type { Config } from "@react-router/dev/config";
import { readPostsName } from "./app/lib/utils.server";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  basename: "/portfolio",
  async prerender() {
    let blogs = await readPostsName();
    return ["", "/blogs", ...blogs.map((blog) => `/blogs/${blog}`)];
  },
} satisfies Config;
