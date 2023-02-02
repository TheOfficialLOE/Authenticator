import { ReactNode, useState } from "react";
import { IModalContext, ModalState, ModalContext } from "./ModalContext";
import { ICode } from "./db";

const ModalProvider = (props: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>(ModalState.Closed);
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [secret, setSecret] = useState<string>("");

  const closeModal = () => {
    setModalState(ModalState.Closed);
    setId("");
    setName("");
    setSecret("");
  };

  const openModalForAdding = () => {
    setModalState(ModalState.Adding);
  };

  const openModalForEditing = (code: ICode) => {
    setModalState(ModalState.Editing);
    setId(code.id)
    setName(code.name);
    setSecret(code.secret);
  };

  const modalCtx: IModalContext = {
    modalState,
    id,
    name,
    secret,
    closeModal,
    openModalForAdding,
    openModalForEditing,
    setName,
    setSecret
  };

  return <ModalContext.Provider value={modalCtx}>
    {props.children}
  </ModalContext.Provider>
};

export default ModalProvider;
