import SiteConfig from "@config/seo.json";

export function getSiteMetaData() {
  return SiteConfig.siteMetadata;
}

// "April 19, 2020"
export function formatDate(date) {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
