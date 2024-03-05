import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

export default function NavbarBlogs() {
  const token = useRouteLoaderData("token") as string;

  const activeLink = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "text-sky-700 text-lg" : "text-slate-800 text-lg";
  };

  return (
    <nav className="w-full mx-auto p-6">
      <ul className="flex space-x-12 items-center justify-center">
        <li>
          <NavLink to={"/"} className={activeLink} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"/events"} className={activeLink}>
            Events
          </NavLink>
        </li>
        {!token && (
          <li>
            <NavLink to={"/auth?mode=login"} className={activeLink}>
              Login
            </NavLink>
          </li>
        )}
        {token && (
          <li>
            <Form action="/logout" method="post">
              <button className={"text-slate-800 hover:text-pink-700 transition duration-150 text-lg"}>Logout</button>
            </Form>
          </li>
        )}
      </ul>
    </nav>
  );
}
