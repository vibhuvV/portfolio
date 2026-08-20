import { MY_DETAILS, SITE_URL } from "./constants";

interface BuildMetaArgs {
  title: string;
  description: string;
  path?: string;
}

export function buildMeta({ title, description, path = "" }: BuildMetaArgs) {
  const url = `${SITE_URL}${path}`;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: `${SITE_URL}/og-image.png` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: MY_DETAILS.name,
  jobTitle: MY_DETAILS.designation,
  email: `mailto:${MY_DETAILS.email}`,
  url: SITE_URL,
  sameAs: [MY_DETAILS.social.github.link, MY_DETAILS.social.linkedIn.link],
};
