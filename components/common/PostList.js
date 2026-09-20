import Link from "next/link";

export function PostList({ posts, numbered = false }) {
  return (
    <div>
      {posts.map(({ slug, frontmatter: { title, description, date, tags } }, index) => (
        <article key={slug} className="flex flex-col gap-2 border-t rule py-6 sm:flex-row sm:gap-8">
          {numbered && (
            <span className="eyebrow w-8 pt-1" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <div className="flex-1">
            <h3 className="mb-1 text-2xl font-bold">
              <Link href={`/post/${slug}/`} className="post-link">
                {title}
              </Link>
            </h3>
            <p className="text-base text-muted">{description}</p>
            {tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tags">
                {tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <time className="whitespace-nowrap text-sm text-muted">{date}</time>
        </article>
      ))}
    </div>
  );
}
