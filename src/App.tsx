import * as React from "react";
import { useContext } from "react";

import { Box, Button, IconButton, Modal, ModalDialog, Typography, useColorScheme } from "@mui/joy";
import db, { ICode } from "./db";
import CodesList from "./components/CodesList";
import CodeForm from "./components/CodeForm";
import { ModalContext, ModalState } from "./ModalContext";
import AddIcon from "./components/icons/AddIcon";

const App = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  const [codes, setCodes] = React.useState<ICode[]>([]);
  const {
    modalState,
    closeModal,
    openModalForAdding,
  } = useContext(ModalContext);

  React.useEffect(() => {
    setMounted(true);

    db.codes.toArray().then(codes => {
      setCodes(codes)
    });
  });

  if (!mounted) {
    return null;
  }

  return <Box component="div" bgcolor={(mode === "dark") ? "rgb(10, 25, 41)" : ""} height="100vh">
    <CodesList codes={codes}/>
    <Button
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
    <IconButton variant="plain" onClick={openModalForAdding} sx={{
      position: "absolute",
      bottom: 30,
      right: 30,
      borderRadius: 999
    }}>
      <AddIcon />
    </IconButton>
    <Modal open={modalState === ModalState.Adding || modalState === ModalState.Editing} onClose={closeModal}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ maxWidth: 500 }}
      >
        <Typography id="basic-modal-dialog-title" component="h2">
          Add new Code
        </Typography>
        <CodeForm />
      </ModalDialog>
    </Modal>
  </Box>
};

export default App;
