import { Outlet } from "react-router-dom";
import NavbarBlogs from "../components/UI/Navbar";
import ModalContextProvider from "../context/Event/Modal";

export default function RootLayout() {
  return (
    <>
      <header className="my-6">
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
