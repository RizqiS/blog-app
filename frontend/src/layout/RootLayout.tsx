import { Outlet } from "react-router-dom";
import NavbarBlogs from "../components/NavbarBlogs";
import ModalContextProvider from "../context/Event/Modal";

export default function RootLayout() {
  return (
    <>
      <header className="my-12">
        <NavbarBlogs />
      </header>
      <main>
        <ModalContextProvider>
          <Outlet />
        </ModalContextProvider>
      </main>
    </>
  );
}
