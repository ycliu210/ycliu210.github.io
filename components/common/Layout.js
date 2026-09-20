import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSiteMetaData } from "@utils/helpers";
import { ThemeToggle } from "./ThemeToggle";

const site = getSiteMetaData();

const NAV_LINKS = [
  { href: "/about/", label: "About" },
  { href: "/writing/", label: "Writing" },
  { href: "/presentations/", label: "Presentations" },
];

function Header() {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  return (
    <header
      className={clsx(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        isRoot ? "mb-12" : "mb-8"
      )}
    >
      <Link
        href="/"
        className={clsx("font-black leading-none text-ink no-underline hover:text-accent", isRoot ? "text-3xl sm:text-4xl" : "text-2xl")}
      >
        {site.author.name}
      </Link>

      <div className="flex items-center gap-5">
        <nav className="flex items-center gap-5" aria-label="Primary navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={clsx("nav-link", pathname.startsWith(href.replace(/\/$/, "")) && "text-accent")}
            >
              {label}
            </Link>
          ))}
          {site.social.github && (
            <a className="nav-link" href={`https://github.com/${site.social.github}`} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

function Footer() {
  const { pathname } = useRouter();
  const isRoot = pathname === "/";

  return (
    <footer className="mt-16 border-t rule pt-8 text-sm text-muted">
      {!isRoot && (
        <p className="mb-4">
          <Link href="/" className="font-semibold">
            ← Back home
          </Link>
        </p>
      )}
      <p>
        © {new Date().getFullYear()} {site.author.name}.{" "}
        {site.social.github && (
          <>
            <a href={`https://github.com/${site.social.github}/${site.social.github}.github.io`}>Read the source</a>.
          </>
        )}
      </p>
      <p className="mt-1">Built with Next.js and Tailwind CSS.</p>
    </footer>
  );
}

export function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <div className="site-container">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
