import { Await, useLoaderData } from "react-router-dom";
import ContentBlog from "../components/ContentBlog";
import HeaderBlog from "../components/HeaderBlog";
import { Suspense } from "react";

export default function HomeBlogs() {
  const events = useLoaderData();
  return (
    <section className="w-full max-h-screen">
      <section>
        <HeaderBlog />
      </section>
      <div>
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <Await resolve={events}>{(eventsResolve) => <ContentBlog events={eventsResolve} />}</Await>
        </Suspense>
      </div>
    </section>
  );
}
