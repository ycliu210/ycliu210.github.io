import { Layout, SEO } from "@components/common";
import { presentations } from "@content/presentations";

export default function Presentations() {
  return (
    <Layout>
      <SEO title="Presentations" description="Talks, demos, and slides." />
      <header className="mb-10">
        <p className="eyebrow mb-3">talks</p>
        <h1 className="mb-3 text-5xl font-black">Presentations</h1>
        <p className="max-w-xl text-lg text-muted">Talks and demos I&apos;ve given. Slides and recordings where available.</p>
      </header>

      {presentations.length === 0 && <p className="text-muted">Nothing here yet — check back soon.</p>}

      {presentations.map((presentation) => (
        <article key={presentation.url} className="border-t rule py-8">
          <p className="eyebrow mb-3">
            {presentation.event} · {presentation.date}
          </p>
          <h2 className="mb-3 text-3xl font-bold">
            <a className="post-link" href={presentation.url} target="_blank" rel="noopener noreferrer">
              {presentation.title}
            </a>
          </h2>
          <p className="mb-5 text-lg leading-relaxed">{presentation.description}</p>
          {presentation.tags?.length > 0 && (
            <ul className="mb-6 flex flex-wrap gap-2" aria-label="Tags">
              {presentation.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <a className="font-semibold" href={presentation.url} target="_blank" rel="noopener noreferrer">
            Open presentation <span aria-hidden="true">↗</span>
          </a>
        </article>
      ))}
    </Layout>
  );
}
