import * as React from "react";

import {
  Box, Button,
  Card, CircularProgress, FormControl, FormLabel, Grid,
  IconButton, Input,
  Menu,
  MenuItem, Modal, ModalDialog, Stack,
  Typography, useColorScheme
} from "@mui/joy";
import {useEffect, useState} from "react";
import CopyIcon from "./components/icons/CopyIcon";
import ThreeDotsIcon from "./components/icons/ThreeDotsIcon";
import totp from "totp-generator";
import db, {ICode} from "./db";
import {nanoid} from "nanoid";

const getCurrentSeconds = () => {
  return Math.round(new Date().getTime() / 1000.0);
};

const isBase32 = (value: string) => {
  const regex = /^([A-Z2-7=]{8})+$/;
  return regex.test(value);
}

const App = () => {
  const [updatingIn, setUpdatingIn] = useState<number>(10);
  const [token, setToken] = useState<string>();
  const [anchorEl, setAnchorEl] = useState(null);

  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [secret, setSecret] = useState<string>("");

  const [codes, setCodes] = useState<ICode[]>([]);

  const open = Boolean(anchorEl);

  useEffect(() => {
    setMounted(true);

    db.codes.toArray().then(codes => {
      setCodes(codes)
    });

    const interval = setInterval(() => {
      setUpdatingIn(10 - (getCurrentSeconds() % 10));
      setToken(totp("JBSWY3DPEHPK3PXP", {
        period: 10
      }));
    }, 1000);

    setUpdatingIn(10 - (getCurrentSeconds() % 10));
    setToken(totp("JBSWY3DPEHPK3PXP", {
      period: 10
    }));

    return () => {
      clearInterval(interval);
    }
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

  // @ts-ignore
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!mounted) {
    return null;
  }

  return <Box component="div" bgcolor={(mode === "dark") ? "rgb(10, 25, 41)" : ""} height="100vh">
    <Grid container direction={{
      xs: "column",
      md: "row"
    }}>
      {codes.map(code => {
        return <Card row invertedColors variant="outlined" sx={{
          m: 1
        }}>
          <Box component="div">
            <Typography>
              Twitter Code
            </Typography>
            <Typography level="h3" fontWeight="bold" color="primary">
              {token}
            </Typography>
          </Box>
          <Box component="div" ml="auto" display="flex" flexDirection="column">
            <Box component="div">
              <IconButton size="sm" variant="plain" sx={{
                width: 16,
                height: 16
              }}>
                <CopyIcon />
              </IconButton>
              <IconButton size="sm" variant="plain" sx={{
                width: 16,
                height: 16
              }} onClick={handleClick}
                          id="positioned-demo-button"
                          aria-controls={open ? 'positioned-demo-menu' : undefined}
                          aria-haspopup="true"
              >
                <ThreeDotsIcon />
              </IconButton>
              <Menu
                id="positioned-demo-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                aria-labelledby="positioned-demo-button"
              >
                <MenuItem>
                  Edit
                </MenuItem>
                <MenuItem>
                  Delete
                </MenuItem>
              </Menu>
            </Box>
            {/*<Box component={"div"} className="timer" ml="auto" mr={0.8} mt={0.5}/>*/}
            <CircularProgress determinate value={(10 - updatingIn / 10) * 100} size="sm" sx={{
              ml: "auto",
              mr: 0.8,
              mt: 0.5
            }}/>
          </Box>
        </Card >
      })}
    </Grid>
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
