import React, { useState, useEffect, useContext } from "react";
import { Box, Button, IconButton, Modal, ModalDialog, Typography, useColorScheme } from "@mui/joy";
import db, { ICode } from "./db";
import CodesList from "./components/CodesList";
import CodeForm from "./components/CodeForm";
import { ModalContext, ModalState } from "./ModalContext";
import AddIcon from "./components/icons/AddIcon";
import LightIcon from "./components/icons/LightIcon";
import DarkIcon from "./components/icons/DarkIcon";
import MyToastContainer from "./components/MyToastContainer";
import createBreakpoints from "@mui/system/createTheme/createBreakpoints";

const App = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  const [codes, setCodes] = useState<ICode[]>([]);
  const {
    modalState,
    closeModal,
    openModalForAdding,
  } = useContext(ModalContext);

  const breakpoints = createBreakpoints({  });

  useEffect(() => {
    setMounted(true);

    db.codes.toArray().then(codes => {
      setCodes(codes)
    });
  });

  if (!mounted) {
    return null;
  }

  return <Box component="div" bgcolor={(mode === "dark") ? "rgb(10, 25, 41)" : ""} minHeight="100vh">
    <Box component="div" p={8} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
      <Typography level="h1">
        Safe Place
      </Typography>
      <IconButton
        variant="outlined"
        sx={{
          width: 10,
          height: 10,
          borderRadius: 999,
          ml: 2
        }}
        onClick={() => {
          setMode(mode === 'light' ? 'dark' : 'light');
        }}
      >
        {mode === "dark" ? <LightIcon /> : <DarkIcon />}
        {/*{mode === 'light' ? 'Turn dark' : 'Turn light'}*/}
      </IconButton>
    </Box>
    <CodesList codes={codes}/>
    <IconButton variant="plain" onClick={openModalForAdding} sx={{
      position: "absolute",
      bottom: 30,
      right: 30,
      borderRadius: 999
    }}>
      <AddIcon />
    </IconButton>
    <Modal open={modalState === ModalState.Adding || modalState === ModalState.Editing} onClose={closeModal}>
      <>
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
        <MyToastContainer />
      </>
    </Modal>
  </Box>
};

export default App;
