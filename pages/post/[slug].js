import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Layout, SEO } from "@components/common";
import { getPostBySlug, getPostsSlugs } from "@utils/posts";

// Images referenced as `image.png` in a post resolve to that post's folder,
// which is copied to /content/posts/<slug>/ by the sitemap script at build time.
function markdownComponents(slug) {
  return {
    img: ({ src, alt }) => {
      const resolved = /^(https?:)?\/\//.test(src) || src.startsWith("/") ? src : `/content/posts/${slug}/${src}`;
      return <img src={resolved} alt={alt} className="w-full" loading="lazy" />;
    },
  };
}

export default function Post({ slug, post, frontmatter, previousPost, nextPost }) {
  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description || post.excerpt} image={frontmatter.image} />
      <article>
        <header className="mb-10">
          <p className="eyebrow mb-3">{frontmatter.date}</p>
          <h1 className="mb-4 text-4xl font-black leading-tight sm:text-5xl">{frontmatter.title}</h1>
          {frontmatter.description && <p className="text-xl text-muted">{frontmatter.description}</p>}
          {frontmatter.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
              {frontmatter.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        <div className="prose prose-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex, [rehypeHighlight, { detect: true, ignoreMissing: true }]]}
            components={markdownComponents(slug)}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <nav className="mt-12 flex justify-between gap-6 border-t rule pt-8" aria-label="Post navigation">
        {previousPost ? (
          <Link href={`/post/${previousPost.slug}/`} className="font-semibold">
            ← {previousPost.frontmatter.title}
          </Link>
        ) : (
          <span />
        )}
        {nextPost ? (
          <Link href={`/post/${nextPost.slug}/`} className="text-right font-semibold">
            {nextPost.frontmatter.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Layout>
  );
}

export async function getStaticPaths() {
  return { paths: getPostsSlugs(), fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const { frontmatter, post, previousPost, nextPost } = getPostBySlug(slug);
  const strip = (p) => (p ? { slug: p.slug, frontmatter: { title: p.frontmatter.title } } : null);

  return {
    props: { slug, frontmatter, post, previousPost: strip(previousPost), nextPost: strip(nextPost) },
  };
}
