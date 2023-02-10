import { IconButton } from "@mui/joy";
import { useContext } from "react";
import { ModalContext } from "../ModalContext";
import AddIcon from "./icons/AddIcon";

const AddButton = () => {
    const {
        openModalForAdding,
      } = useContext(ModalContext);
      
    return <IconButton variant="solid" onClick={openModalForAdding} sx={{
        position: "fixed",
        bottom: 30,
        right: 30,
        borderRadius: 999
      }}>
        <AddIcon />
      </IconButton>
};

export default AddButton;