import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";
import ContentBlog from "../../components/EventBlog/ContentBlog";
import { TEvents } from "../../types/events";

export default function EventsBlog() {
  const events = useLoaderData() as TEvents[];
  return (
    <Suspense fallback={<p className="text-center">Loading...</p>}>
      <section>
        <h2 className="text-center text-xl font-serif">Created By Author</h2>
        <div className="mt-6">
          <ContentBlog events={events} />
        </div>
      </section>
    </Suspense>
  );
}
