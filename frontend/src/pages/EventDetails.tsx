import { Link, useRouteLoaderData } from "react-router-dom";
import { TEvents } from "../types/events";
import { Suspense, lazy, useContext } from "react";
import { ContextModal } from "../context/Event/Modal";
// import Modal from "../components/UI/Modal";

const Modal = lazy(() => import("../components/UI/Modal"));
export default function EventDetails() {
  const modal_ctx = useContext(ContextModal);
  const eventsPromise = useRouteLoaderData("event-detail") as TEvents;
  const date = new Date(eventsPromise.current_date);
  return (
    <section className="container mx-auto">
      <div className="mb-6 max-w-5xl mx-6 md:mx-auto">
        <h1 className="text-5xl font-bold tracking-wide text-start">{eventsPromise.title}</h1>
        <span className="block text-base mt-3 mb-1 text-slate-400">{date.toUTCString()}</span>
        <Link to={"/"} className="font-semibold ">
          <span className="transition duration-150 hover:text-slate-700 text-green-600">Back to Home - </span> /events/
          {eventsPromise.title}/detail
        </Link>
        <div className="my-3 flex space-x-6">
          <Link to={"/events/new"} className="transition duration-150 text-green-600 hover:text-green-500">
            New Event
          </Link>
          <Link
            to={`/events/${eventsPromise._id}/edit`}
            className="transition duration-150 text-sky-600 hover:text-sky-500"
          >
            Edit Event
          </Link>
          {/* <Link to={`/`} className="transition duration-150 text-pink-600 hover:text-pink-500">
            Delete Event
          </Link> */}
          <button className="transition duration-150 text-pink-600 hover:text-pink-500" onClick={modal_ctx.openModal}>
            Delete Event
          </button>
          {modal_ctx.ismodal && (
            <Suspense fallback={<p className="text-center">Loading...</p>}>
              <Modal />
            </Suspense>
          )}
        </div>
      </div>
      <div className="max-w-5xl mx-auto overflow-hidden my-12">
        <img
          src={eventsPromise.image}
          alt={eventsPromise._id}
          width={100}
          height={100}
          className="w-full h-96 object-cover object-center rounded-lg mx-6 md:mx-0"
        />
        <p className="mt-12 leading-6 text-base">{eventsPromise.description}</p>
      </div>
    </section>
  );
}
