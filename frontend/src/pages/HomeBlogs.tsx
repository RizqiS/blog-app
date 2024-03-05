import HeaderBlog from "../components/EventBlog/HeaderBlog";
import ContentArticle from "./ContentArticle";
import { useEffect, useState } from "react";
import { TEvents } from "../types/events";

const url: string = import.meta.env.VITE_BACEND_URL as string;

async function getEventsLimit(baseUrl: string, query: string) {
  const response = await fetch(`${baseUrl}?${query}`);
  const data = await response.json();
  return data;
}

export default function HomeBlogs() {
  const [events, setEvents] = useState<TEvents[]>([]);

  useEffect(() => {
    getEventsLimit(`${url}/events/`, "limit=3").then((res) => setEvents(res));
  }, []);

  return (
    <section className="w-full max-h-screen">
      <div>
        <HeaderBlog />
        <div className="mt-12 mb-12">{events && events.length !== 0 && <ContentArticle events={events} />}</div>
        <div>
          <h2>FOOTER</h2>
        </div>
      </div>
    </section>
  );
}
