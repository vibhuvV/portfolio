// Generates build/client/sitemap.xml from the actual blog files, so new
// posts are always included without manual maintenance. Runs as part of
// `pnpm run build` (after react-router build produces build/client/).
import fs from "fs/promises";
import path from "path";

const SITE_URL = "https://vibhuvv.github.io/portfolio";
const BLOGS_DIR = path.resolve("./app/blogs");
const OUTPUT = path.resolve("./build/client/sitemap.xml");

async function getLastmod(fileName) {
  const content = await fs.readFile(path.join(BLOGS_DIR, fileName), "utf8");
  const match = content.match(/datetime:\s*"?(\d{4}-\d{2}-\d{2})"?/);
  return match ? match[1] : null;
}

async function main() {
  const files = (await fs.readdir(BLOGS_DIR)).filter((file) =>
    file.endsWith(".md")
  );

  const staticUrls = [
    { loc: `${SITE_URL}`, lastmod: null },
    { loc: `${SITE_URL}/blogs`, lastmod: null },
  ];

  const blogUrls = await Promise.all(
    files.map(async (file) => ({
      loc: `${SITE_URL}/blogs/${file.replace(/\.md$/, "")}`,
      lastmod: await getLastmod(file),
    }))
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...blogUrls]
  .map(
    ({ loc, lastmod }) =>
      `  <url>\n    <loc>${loc}</loc>${
        lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""
      }\n  </url>`
  )
  .join("\n")}
</urlset>
`;

  await fs.mkdir(path.dirname(OUTPUT), { recursive: true });
  await fs.writeFile(OUTPUT, xml, "utf8");
  console.log(`sitemap.xml written with ${staticUrls.length + blogUrls.length} URLs`);
}

main();
