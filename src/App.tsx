import * as React from "react";

import {
  Box, Button, FormControl, FormLabel,
  Input, Modal, ModalDialog, Stack,
  Typography, useColorScheme
} from "@mui/joy";
import {useEffect, useState} from "react";
import db, {ICode} from "./db";
import {nanoid} from "nanoid";
import CodesList from "./components/CodesList";

const isBase32 = (value: string) => {
  const regex = /^([A-Z2-7=]{8})+$/;
  return regex.test(value);
}

const App = () => {
  const {mode, setMode} = useColorScheme();
  const [mounted, setMounted] = useState(false);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [secret, setSecret] = useState<string>("");

  const [codes, setCodes] = useState<ICode[]>([]);

  useEffect(() => {
    setMounted(true);

    db.codes.toArray().then(codes => {
      setCodes(codes)
    });
  });

  // @ts-ignore
  const onFormSubmit = (e) => {
    e.preventDefault();

    if (name.length >= 20 || !isBase32(secret))
      return;

    db.codes.add({
      id: nanoid(8),
      name,
      secret
    });

    setModalOpen(false);
    setName("");
    setSecret("");
  }

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
        sx={{maxWidth: 500}}
      >
        <Typography id="basic-modal-dialog-title" component="h2">
          Create new project
        </Typography>
        <Typography id="basic-modal-dialog-description" textColor="text.tertiary">
          Fill in the information of the project.
        </Typography>
        <form
          onSubmit={onFormSubmit}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input autoFocus required onChange={(value => setName(value.currentTarget.value))}/>
            </FormControl>
            <FormControl>
              <FormLabel>Secret</FormLabel>
              <Input required onChange={(value => setSecret(value.currentTarget.value))}/>
            </FormControl>
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
  </Box>
};

export default App;
