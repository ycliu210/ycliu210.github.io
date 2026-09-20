import Head from "next/head";
import { useRouter } from "next/router";
import { getSiteMetaData } from "@utils/helpers";

export function SEO({ title, description, image }) {
  const site = getSiteMetaData();
  const { asPath } = useRouter();

  const pageTitle = title ? `${title} · ${site.title}` : site.title;
  const metaDescription = description || site.description;
  const url = `${site.siteUrl}${asPath}`;
  const ogImage = image ? `${site.siteUrl}${image}` : `${site.siteUrl}${site.author.photo}`;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={site.keywords} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.title} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {site.social.twitter && <meta name="twitter:creator" content={`@${site.social.twitter}`} />}

      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
    </Head>
  );
}
