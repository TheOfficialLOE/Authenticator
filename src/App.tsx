import * as React from "react";

import {
  Box, Button,
  Card, CircularProgress, Grid,
  IconButton,
  Menu,
  MenuItem, Modal, ModalDialog,
  Typography, useColorScheme
} from "@mui/joy";
import {useEffect, useState} from "react";
import CopyIcon from "./components/icons/CopyIcon";
import ThreeDotsIcon from "./components/icons/ThreeDotsIcon";
import totp from "totp-generator";

const getCurrentSeconds = () => {
  return Math.round(new Date().getTime() / 1000.0);
};

const App = () => {
  const [updatingIn, setUpdatingIn] = useState<number>(10);
  const [token, setToken] = useState<string>();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    setMounted(true);

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
      <Card row invertedColors variant="outlined" sx={{
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
      <ModalDialog>
        <Typography>
          kh dash
        </Typography>
      </ModalDialog>
    </Modal>
  </Box>
};

export default App;
