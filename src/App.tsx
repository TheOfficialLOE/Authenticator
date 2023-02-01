import * as React from "react";

import {
  Box, Button, Modal, ModalDialog,
  Typography, useColorScheme
} from "@mui/joy";
import db, {ICode} from "./db";
import CodesList from "./components/CodesList";
import AddCodeForm from "./components/AddCodeForm";

const App = () => {
  const {mode, setMode} = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [codes, setCodes] = React.useState<ICode[]>([]);

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
    <Button onClick={() => setModalOpen(true)}>
      new
    </Button>
    <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ maxWidth: 500 }}
      >
        <Typography id="basic-modal-dialog-title" component="h2">
          Add new Code
        </Typography>
        <AddCodeForm setModalOpen={setModalOpen} />
      </ModalDialog>
    </Modal>
  </Box>
};

export default App;
