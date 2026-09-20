import { Layout, SEO, PostList } from "@components/common";
import { getSortedPosts } from "@utils/posts";

export default function Writing({ posts }) {
  return (
    <Layout>
      <SEO title="Writing" description="The complete archive of posts." />
      <header className="mb-10">
        <p className="eyebrow mb-3">archive</p>
        <h1 className="mb-3 text-5xl font-black">All writing</h1>
        <p className="max-w-xl text-lg text-muted">
          {posts.length} {posts.length === 1 ? "post" : "posts"}, newest first.
        </p>
      </header>
      <PostList posts={posts} numbered />
    </Layout>
  );
}

export async function getStaticProps() {
  return { props: { posts: getSortedPosts() } };
}
