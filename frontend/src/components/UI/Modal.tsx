import { useContext } from "react";
import { ContextModal } from "../../context/Event/Modal";
import { useLocation, useSubmit } from "react-router-dom";

export default function Modal() {
  const modal_ctx = useContext(ContextModal);
  const submit = useSubmit();
  const location = useLocation();

  const handleDeleteBlog = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    submit(null, { action: location.pathname, method: "delete" });
    modal_ctx.closeModal();
  };
  return (
    <>
      {modal_ctx.ismodal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={modal_ctx.closeModal}></div>
            <div className="flex items-center min-h-screen px-4 py-8">
              <div className="relative w-full max-w-md p-4 mx-auto bg-slate-100 rounded-md shadow-lg">
                <div className="mt-3 sm:flex justify-center items-center">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="text-lg font-medium text-slate-800">Delete blog </h4>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
                      are you sure you want to delete this blog ?
                    </p>
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <button
                        className="w-full mt-2 p-1.5 flex-1 text-white bg-pink-600 hover:bg-pink-500 rounded-md outline-none ring-offset-2 ring-pink-600 hover:ring-pink-500 focus:ring-2 transition duration-150"
                        onClick={handleDeleteBlog}
                      >
                        Delete
                      </button>
                      <button
                        className="w-full mt-2 p-1.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                        onClick={modal_ctx.closeModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
