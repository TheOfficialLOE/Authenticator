import * as React from "react";

import {
  Box,
  Card, CircularProgress, Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography
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
  const open = Boolean(anchorEl);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatingIn(10 - (getCurrentSeconds() % 10));
      setToken(totp("JBSWY3DPEHPK3PXP", {
        period: 10
      }));
    }, 1000);

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

  return <Box component="div" mt={14}>
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
              sx={{
                borderRadius: 10,
                fontFamily: "Roboto"
              }}
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
  </Box>
};

export default App;
