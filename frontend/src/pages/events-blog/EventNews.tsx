import { useNavigate } from "react-router-dom";
import FormEventsBlog from "../../components/EventBlog/FormEventsBlog";

export default function EventNews() {
  const navigate = useNavigate();
  return (
    <section className="container border flex flex-col justify-center items-center mx-auto mb-3">
      <button
        onClick={() => navigate("/")}
        className="mb-6 tracking-wider font-serif px-3 py-1.5 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition duration-150 mt-3"
      >
        / back to home
      </button>
      <FormEventsBlog method="post" action="/events/new" />
    </section>
  );
}
