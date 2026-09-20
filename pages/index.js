import Link from "next/link";
import { Layout, SEO, Bio, PostList } from "@components/common";
import { getSortedPosts } from "@utils/posts";
import { projects } from "@content/projects";
import { presentations } from "@content/presentations";

export default function Home({ posts }) {
  return (
    <Layout>
      <SEO />
      <Bio className="mb-16" />

      {projects.length > 0 && (
        <section className="mb-16 border-t rule pt-8" aria-labelledby="projects">
          <h2 id="projects" className="mb-2 text-3xl font-black">
            Projects
          </h2>
          <p className="text-muted">Things I build and maintain.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <article key={project.url} className="border-t rule pt-5">
                <p className="eyebrow mb-2">{project.role}</p>
                <h3 className="mb-2 text-2xl font-bold">
                  <a className="post-link" href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                </h3>
                <p className="leading-relaxed">{project.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {presentations.length > 0 && (
        <section className="mb-16 border-t rule pt-8" aria-labelledby="presentations">
          <div className="flex items-end justify-between">
            <h2 id="presentations" className="text-3xl font-black">
              Presentations
            </h2>
            <Link href="/presentations/" className="font-semibold">
              View all →
            </Link>
          </div>
          {presentations.slice(0, 3).map((presentation) => (
            <article key={presentation.url} className="mt-8">
              <p className="eyebrow mb-2">
                {presentation.event} · {presentation.date}
              </p>
              <h3 className="mb-2 text-2xl font-bold">
                <a className="post-link" href={presentation.url} target="_blank" rel="noopener noreferrer">
                  {presentation.title}
                </a>
              </h3>
              <p className="leading-relaxed">{presentation.description}</p>
            </article>
          ))}
        </section>
      )}

      <section className="border-t rule pt-8" aria-labelledby="writing">
        <div className="mb-2 flex items-end justify-between">
          <h2 id="writing" className="text-3xl font-black">
            Writing
          </h2>
          <Link href="/writing/" className="font-semibold">
            View all →
          </Link>
        </div>
        <PostList posts={posts} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { posts: getSortedPosts().slice(0, 5) } };
}
