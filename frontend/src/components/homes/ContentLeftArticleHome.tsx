import { Link } from "react-router-dom";
import { TEvents } from "../../types/events";

type TLeafContentProps = {
  events: TEvents;
};

export default function ContentLeftArticleHome({ events }: TLeafContentProps) {
  return (
    <div
      className="w-full h-[300px] rounded-lg overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${events.image}')` }}
    >
      <div className="h-full w-full bg-black/40">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="text-slate-200 text-xl md:text-2xl font-bold text-center">{events.title}</h1>
          <Link
            to={`/events/${events._id}/detail`}
            className="text-slate-200 mt-6 ring font-semibold ring-slate-300 px-3 py-2 rounded-lg hover:ring-0 hover:bg-slate-800 transition duration-150"
          >
            read more
          </Link>
        </div>
      </div>
    </div>
  );
}
