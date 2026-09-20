import { Layout, SEO } from "@components/common";
import { getSiteMetaData } from "@utils/helpers";

const { author, social } = getSiteMetaData();

export default function About() {
  return (
    <Layout>
      <SEO title="About" description={`About ${author.name}`} />
      <header className="mb-8 flex items-center gap-6">
        <img src={author.photo} alt={author.name} className="profile-photo" />
        <h1 className="text-4xl font-black">Hello there! 👋</h1>
      </header>

      {/* TODO: Replace the copy below with your own story. */}
      <div className="prose prose-lg max-w-none">
        <p>
          I&apos;m {author.name}. <em>TODO: one or two sentences introducing yourself — what you do and what you care
          about.</em>
        </p>
        <p>
          <em>TODO: what you&apos;re working on now.</em>
        </p>
        <p>
          <em>TODO: a sentence or two about your background — previous roles, education, notable projects.</em>
        </p>
        <p>
          <em>TODO: what you do outside of work — hobbies, interests, where you&apos;re based.</em>
        </p>
        <h2>Get in touch</h2>
        <ul>
          {social.github && (
            <li>
              GitHub: <a href={`https://github.com/${social.github}`}>@{social.github}</a>
            </li>
          )}
          {social.linkedin && (
            <li>
              LinkedIn: <a href={`https://www.linkedin.com/in/${social.linkedin}`}>{social.linkedin}</a>
            </li>
          )}
          {social.twitter && (
            <li>
              Twitter: <a href={`https://twitter.com/${social.twitter}`}>@{social.twitter}</a>
            </li>
          )}
          {social.email && (
            <li>
              Email: <a href={`mailto:${social.email}`}>{social.email}</a>
            </li>
          )}
        </ul>
      </div>
    </Layout>
  );
}
