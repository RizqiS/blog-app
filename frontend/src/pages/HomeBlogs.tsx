import { Await, useLoaderData } from "react-router-dom";
import ContentBlog from "../components/EventBlog/ContentBlog";
import { Suspense } from "react";

export default function HomeBlogs() {
  const events = useLoaderData();
  return (
    <section className="w-full max-h-screen">
      <div>
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <Await resolve={events}>{(eventsResolve) => <ContentBlog events={eventsResolve} />}</Await>
        </Suspense>
      </div>
    </section>
  );
}
