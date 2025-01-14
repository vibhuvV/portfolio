import parseFrontMatter from "front-matter";
import fs from "fs/promises";
import path from "path";

export async function readPost(fileName: string): Promise<string> {
  const filePath = path.resolve(`./app/blogs/${fileName}.md`);
  const file = await fs.readFile(filePath, { encoding: "utf8" });

  return file.toString();
}

export const readPostsName = async (limit?: number) => {
  const dirPath = path.resolve("./app/blogs");
  const files = await fs.readdir(dirPath);

  // Filter only .md files and remove the .md extension
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""))
    .slice(0, limit);
};

export const getBlogMetadataAndBody = async (content: string) => {
  const { attributes, body } = parseFrontMatter<{
    title: string;
    description: string;
    datetime: string;
  }>(content);

  return { attributes, body };
};
