import { useNavigate, useRouteLoaderData } from "react-router-dom";

export default function HeaderBlog() {
  const token = useRouteLoaderData("token") as string;
  const navigate = useNavigate();
  const handleCreateBlog = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`${token ? "/events/new" : "/auth?mode=login"}`);
  };
  return (
    <div
      className="border container mx-auto h-96 md:h-[600px] rounded-lg overflow-hidden bg-cover bg-center md:bg-contain"
      style={{ backgroundImage: 'url("https://lp2m.uma.ac.id/wp-content/uploads/2021/09/bloguma.jpg")' }}
    >
      <div className="h-full w-full bg-black/80 flex flex-col items-center justify-center gap-y-3 text-center  md:m-0 px-3 ">
        <h2 className="text-slate-200 text-2xl md:text-3xl">Let's create some blogs</h2>
        <p className="text-slate-200 text-lg md:text-xl">
          Pour your writing ideas here let the whole world read about your{" "}
          <span className="block text-center text-yellow-400 tracking-wider font-serif">writing ideas here</span>
        </p>
        <button
          onClick={handleCreateBlog}
          className="mt-3 text-slate-100 py-2 px-3 rounded-lg transition duration-150 bg-green-600 hover:bg-green-500 text-xs md:text-base"
        >
          {token ? "Create One Blog" : "Login or Signup to Create Blog"}
        </button>
      </div>
    </div>
  );
}
