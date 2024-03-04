import { createContext, useState } from "react";

type TModal = {
  ismodal: boolean;
  openModal(): void;
  closeModal(): void;
};

export const ContextModal = createContext<TModal>({
  ismodal: false,
  openModal: () => {},
  closeModal: () => {},
});

type TModalProvider = {
  children: React.ReactNode;
};
export default function ModalContextProvider({ children }: TModalProvider) {
  const [isModal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const value = {
    ismodal: isModal,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  };

  return <ContextModal.Provider value={value}>{children}</ContextModal.Provider>;
}
