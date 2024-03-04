import { useNavigate } from "react-router-dom";

export default function HeaderBlog() {
  const navigate = useNavigate();
  const handleCreateBlog = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate("/events/new");
  };
  return (
    <div
      className="border container mx-auto h-[600px] rounded-lg overflow-hidden"
      style={{ backgroundImage: 'url("https://lp2m.uma.ac.id/wp-content/uploads/2021/09/bloguma.jpg")' }}
    >
      <div className="h-full w-full bg-black/80 flex flex-col items-center justify-center gap-y-3">
        <h2 className="text-slate-200 text-3xl">Let's create some blogs</h2>
        <p className="text-slate-200 text-xl">
          Pour your writing ideas here let the whole world read about your{" "}
          <span className="block text-center text-yellow-400 tracking-wider font-serif">writing ideas here</span>
        </p>
        <button
          onClick={handleCreateBlog}
          className="mt-3 text-slate-100 py-2 px-3 rounded-lg transition duration-150 bg-green-600 hover:bg-green-500"
        >
          Create One Blog
        </button>
      </div>
    </div>
  );
}
