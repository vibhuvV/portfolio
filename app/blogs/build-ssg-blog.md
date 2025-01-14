---
title: Build your SSG blogs using React Router Framework (Formerly Remix)
description: Create your static blog site in React Router Framework (Formerly Remix). Add new blogs by directly writing blogs in Markdown.
datetime: 14th Jan, 2025
---

**Create your static blog site in React Router framework. Add new blogs by directly writing blogs in Markdown.**

Static Site Generators (SSG) have become increasingly popular for building fast and SEO-friendly websites. React Router framework, a modern web framework, not only supports server-side rendering (SSR) but also offers capabilities to build static sites efficiently. In this blog, I'll guide you through creating a static blog site using React Router framework, where you can add content by simply writing Markdown files.

## Why Choose React Router framework for Your Static Blog?

React Router framework stands out due to its flexibility and performance. Here are some reasons why it’s a great choice for building a static blog:

- **Hybrid Rendering**: Mix static and dynamic content seamlessly.
- **Optimized for Performance**: Enjoy blazing-fast load times and a great user experience.
- **Built-in Routing**: Automatically map routes to your file structure.
- **Markdown Support**: Easily write and manage blog content in Markdown files.

## Steps to Build Your Static Blog 🛠️

### 1. Set Up a React Router framework Project

Start by creating a new React Router framework project:

```bash
npx create-react-router@latest my-static-blog
cd my-static-blog
npm install
```

### 2. Install Markdown Dependencies

To process Markdown files, we’ll need a library like `front-matter` or `gray-matter` for front matter and `react-markdown` or `remark` for rendering:

```bash
npm install front-matter react-markdown
```

### 3. Organize Your Folder Structure

Create a `content` directory in the root of your project to store Markdown files:

```plaintext
my-static-blog/
|-- app/
    |-- routes/
        |-- home.tsx
        |-- blog.tsx
    |-- routes.ts
    |-- utils.ts
|-- content/
    |-- my-first-post.md
    |-- another-post.md
```

### 4. Parse and Render Markdown

Use a utility function to load and parse Markdown files:

```javascript
import fs from "fs";
import path from "path";
import parseFrontMatter from "front-matter";

const contentDir = path.join(process.cwd(), "content");

export function getPost(filename) {
  const filePath = path.join(contentDir, filename);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { attributes, body } = parseFrontMatter(fileContent);

  return {
    slug: filename.replace(/\.md$/, ""),
    title: attributes.title,
    date: attributes.date,
    content: body,
  };
}

export function getPosts() {
  const filenames = fs.readdirSync(contentDir);

  return filenames.map(getPost);
}
```

### 5. Create Blog Routes

Map your blog posts to dynamic routes in React Router framework. Create a folder routes to add all your application routes and add the following code to your `app/routes.ts` file:

```javascript
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route(":blogId", "routes/blog.tsx")
] satisfies RouteConfig;
```

### 6. Add an Index Page

Inside the `app/routes/home.tsx` file write code to display a list of all your blog posts:

```javascript
import type { Route } from "./+types/blog";
import { getPosts } from "~/utils";

export async function loader() {
  return getPosts();
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const posts = loaderData;

  return (
    <main>
      <h1>My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
```

### 7. Add an Blog Page

Inside the `app/routes/blog.tsx` file write code to render your blog based on file name:

```javascript
import type { Route } from "./+types/blog";
import { getPost } from "~/utils";

import ReactMarkdown from "react-markdown";

export async function loader({ params }: Route.LoaderArgs) {
  return getPost(params);
}

export default function BlogIndex({ loaderData }: Route.ComponentProps) {
  const post = loaderData;

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </main>
  );
}
```

### 8. Build and deploy Your App

We will build all the static files and deploy our blogs app on [Github](https://github.com) using Github Actions on Github Pages. I have documented complete deployment process in in blog [Deploy SSG React Router Framework (formerly Remix) to Github Pages](/blogs/deploy-ssg-blog-github)

## SEO Tips for Your React Router framework Blog

1. **Add Meta Tags**: Include metadata for better search engine visibility. Use the `meta` export in React Router framework routes:

   ```javascript
   export function meta({ data }) {
     return {
       title: data.title,
       description: data.excerpt,
     };
   }
   ```

2. **Optimize Markdown Content**: Write high-quality, keyword-rich content in Markdown files.

3. **Generate a Sitemap**: Use a tool like `sitemap-generator-cli` to create a sitemap for your blog.

4. **Enable Open Graph and Twitter Cards**: Add Open Graph tags to make your blog posts shareable on social media.

5. **Use Descriptive URLs**: Ensure your blog slugs are clear and descriptive.

6. **Optimize Images**: Use tools like `image-optimizer` to compress images and improve load times.

---

By following this guide, you’ll have a static blog site built with React Router framework, leveraging the simplicity of Markdown for content management. With a little effort in SEO optimization, your blog can rank higher and reach a broader audience.

Happy coding! 😇
