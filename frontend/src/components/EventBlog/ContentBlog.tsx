import { Link } from "react-router-dom";
import { TEvents } from "../../types/events";
type TContentBlogProps = {
  isBlur?: boolean;
  events: TEvents[];
};

export default function ContentBlog({ events, isBlur }: TContentBlogProps) {
  return (
    <div className="w-full border">
      <div className="my-12 max-w-5xl mx-6 lg:mx-auto drop-shadow-lg">
        <article className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 group">
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
                  className={`object-cover object-top w-full h-[190px] ${
                    isBlur && "md:blur-sm md:group-hover:blur-0"
                  } group-hover:transition group-hover:duration-150`}
                  alt=""
                />
                <div className="mx-3 my-1.5">
                  <div>
                    <h2 className="line-clamp-1">{item.title}</h2>
                    <span className="block text-[12px] mb-1 text-slate-400">
                      {new Date(item.current_date).toUTCString()}
                    </span>
                    <Link
                      to={`/events/${item._id}/detail`}
                      className="visible text-xs px-2 py-1 rounded-lg cursor-pointer bg-sky-500 text-white md:invisible md:group-hover/content:visible md:group-hover/content:bg-sky-500 md:group-hover/content:text-white transition duration-150 inline-block mb-1"
                    >
                      show detail{" "}
                    </Link>
                  </div>
                </div>
              </section>
            ))}
        </article>
      </div>
    </div>
  );
}
