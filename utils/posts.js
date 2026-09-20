import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { formatDate } from "./helpers";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

// Each post lives in its own folder: content/posts/<slug>/<slug>.md
// (a folder makes it easy to keep a post's images next to it).
function getPostFolders() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(POSTS_DIR, slug, `${slug}.md`)));
}

export function getSortedPosts() {
  return getPostFolders()
    .map((slug) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, slug, `${slug}.md`), "utf8");
      const { data, excerpt, content } = matter(raw, { excerpt: true });

      return {
        slug,
        frontmatter: {
          ...data,
          draft: Boolean(data.draft),
          tags: data.tags || [],
          rawDate: new Date(data.date).toISOString(),
          date: formatDate(data.date),
        },
        excerpt,
        content,
      };
    })
    .filter((post) => !post.frontmatter.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => new Date(b.frontmatter.rawDate) - new Date(a.frontmatter.rawDate));
}

export function getPostsSlugs() {
  return getSortedPosts().map(({ slug }) => ({ params: { slug } }));
}

export function getPostBySlug(slug) {
  const posts = getSortedPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  const { frontmatter, content, excerpt } = posts[index];

  return {
    frontmatter,
    post: { content, excerpt },
    // Posts are sorted newest-first, so "previous" is the older one.
    previousPost: posts[index + 1] || null,
    nextPost: posts[index - 1] || null,
  };
}
