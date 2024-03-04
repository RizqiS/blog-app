import { useNavigate, useRouteLoaderData } from "react-router-dom";
import { TEvents } from "../types/events";
import FormEventsBlog from "../components/FormEventsBlog";

export default function EventEdits() {
  const events = useRouteLoaderData("event-detail") as TEvents;
  const navigate = useNavigate();

  return (
    <section className="container border flex flex-col justify-center items-center">
      <button
        onClick={() => navigate(`/events/${events._id}/detail`)}
        className="mb-6 tracking-wider font-serif px-3 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition duration-150"
      >
        / back to detail
      </button>
      <FormEventsBlog method="patch" action={`/events/${events._id}/edit`} events={events} />
    </section>
  );
}
