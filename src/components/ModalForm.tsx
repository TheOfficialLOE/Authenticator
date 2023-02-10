import { Modal, ModalDialog, Typography } from "@mui/joy";
import { useContext } from "react";
import { ModalContext, ModalState } from "../ModalContext";
import Form from "./Form";
import MyToastContainer from "./MyToastContainer";

const ModalForm = () => {
    const {
        modalState,
        closeModal,
      } = useContext(ModalContext);

    return <Modal 
    open={modalState === ModalState.Adding || modalState === ModalState.Editing} 
    onClose={closeModal}>
    <>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ maxWidth: 500 }}
      >
        <Typography id="basic-modal-dialog-title" component="h2">
          Add new Code
        </Typography>
        <Form />
      </ModalDialog>
      <MyToastContainer />
    </>
  </Modal>
};

export default ModalForm;