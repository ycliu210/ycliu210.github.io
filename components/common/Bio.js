import Link from "next/link";
import { getSiteMetaData } from "@utils/helpers";

export function Bio({ className }) {
  const { author, social, description } = getSiteMetaData();

  return (
    <section className={className}>
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <img src={author.photo} alt={author.name} className="profile-photo" />
        <div>
          <p className="eyebrow mb-2">{author.summary}</p>
          <h1 className="mb-3 text-3xl font-black leading-tight sm:text-4xl">Hi, I&apos;m {author.name}.</h1>
          <p className="max-w-xl text-lg text-muted">{description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
            <Link href="/about/">More about me →</Link>
            {social.github && (
              <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
            {social.linkedin && (
              <a href={`https://www.linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            )}
            {social.twitter && (
              <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer">
                Twitter ↗
              </a>
            )}
            {social.email && <a href={`mailto:${social.email}`}>Email ↗</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
