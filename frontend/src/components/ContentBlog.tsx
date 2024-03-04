import { Link } from "react-router-dom";
import { TEvents } from "../types/events";
type TContentBlogProps = {
  events: TEvents[];
};

export default function ContentBlog({ events }: TContentBlogProps) {
  return (
    <div className="my-12 max-w-4xl mx-6 lg:mx-auto">
      <article className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {events &&
          events.map((item) => (
            <section
              key={item._id}
              className="shadow border rounded-lg overflow-hidden flex flex-col justify-between gap-y-3 group/content"
            >
              <img
                src={item.image}
                width={100}
                height={100}
                className="object-cover object-top w-full h-[190px]"
                alt=""
              />
              <div className="mx-3 my-1.5 ">
                <div>
                  <h2 className="line-clamp-1">{item.title}</h2>
                  <span className="block text-[12px] mb-1 text-slate-400">
                    {new Date(item.current_date).toUTCString()}
                  </span>
                  <Link
                    to={`/events/${item._id}/detail`}
                    className="invisible text-xs px-2 py-1 rounded-lg cursor-pointer group-hover/content:visible group-hover/content:bg-sky-500 group-hover/content:text-white group-hover/content:transition group-hover/content:duration-150 inline-block mb-1"
                  >
                    show detail{" "}
                  </Link>
                </div>
              </div>
            </section>
          ))}
      </article>
    </div>
  );
}
