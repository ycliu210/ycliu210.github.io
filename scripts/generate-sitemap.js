/* eslint-disable no-console */
// Runs after `next build`: writes out/sitemap.xml and copies post images into out/.
const fs = require("fs");
const path = require("path");
const globby = require("globby");
const { siteMetadata } = require("../config/seo.json");

const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "out");
const siteUrl = siteMetadata.siteUrl.replace(/\/$/, "");

async function main() {
  if (!fs.existsSync(OUT)) {
    console.error("out/ does not exist — run `next build` first.");
    process.exit(1);
  }

  // Every exported HTML file is a route.
  const pages = await globby(["**/*.html", "!404.html", "!404/**"], { cwd: OUT });
  const routes = pages
    .map((page) => page.replace(/index\.html$/, "").replace(/\.html$/, "/"))
    .map((route) => (route === "" ? "/" : `/${route}`));

  const urls = routes
    .sort()
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.6"}</priority>
  </url>`
    )
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(OUT, "sitemap.xml"), sitemap);
  console.log(`sitemap.xml: ${routes.length} routes`);

  // Copy non-markdown assets from each post folder so `![](image.png)` resolves.
  const assets = await globby(["content/posts/**/*", "!**/*.md"], { cwd: ROOT });
  for (const asset of assets) {
    const dest = path.join(OUT, asset);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(path.join(ROOT, asset), dest);
  }
  if (assets.length) console.log(`copied ${assets.length} post asset(s)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
