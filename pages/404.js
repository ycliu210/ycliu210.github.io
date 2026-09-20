import Link from "next/link";
import { Layout, SEO } from "@components/common";

export default function NotFound() {
  return (
    <Layout>
      <SEO title="Not found" />
      <p className="eyebrow mb-3">404</p>
      <h1 className="mb-4 text-5xl font-black">Page not found</h1>
      <p className="text-lg text-muted">
        That page doesn&apos;t exist. <Link href="/">Head back home</Link>.
      </p>
    </Layout>
  );
}
