import {
  getBlogMetadataAndBody,
  readPost,
  readPostsName,
} from "~/lib/utils.server";

export const getBlogsMetadataList = async (limit = 3) => {
  const blogFileNames = await readPostsName(limit);

  const fileContents = await Promise.all(
    blogFileNames.map((blogFileName) => readPost(blogFileName))
  );
  const metadataAndBody = await Promise.all(
    fileContents.map((fileContent) => getBlogMetadataAndBody(fileContent))
  );

  return metadataAndBody.map((data, idx) => ({
    name: blogFileNames[idx],
    attributes: data.attributes,
  }));
};
