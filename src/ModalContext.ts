import { createContext } from "react";
import { ICode } from "./db";

export enum ModalState {
  Closed,
  Adding,
  Editing
}

export interface IModalContext {
  modalState: ModalState,
  id: string,
  name: string,
  secret: string,
  closeModal: () => void,
  openModalForAdding: () => void,
  openModalForEditing: (code: ICode) => void,
  setName: (name: string) => void,
  setSecret: (secret: string) => void
}

export const ModalContext = createContext<IModalContext>({
  modalState: ModalState.Closed,
  id: "",
  name: "",
  secret: "",
  closeModal: () => { },
  openModalForAdding: () => { },
  openModalForEditing: (code: ICode) => { },
  setName: (name: string) => { },
  setSecret: (secret: string) => { }
});
