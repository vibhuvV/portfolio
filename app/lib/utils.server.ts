import fs from "fs/promises";
import path from "path";

export async function readPost(fileName: string) {
  const file = await fs.readFile(
    `${path.resolve(`./app/blogs/${fileName}.md`)}`
  );
  return file.toString();
}

export const readPostsName = async () => {
  const dirPath = path.resolve("./app/blogs");
  const files = await fs.readdir(dirPath);
  // Filter only .md files and remove the .md extension
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
};
