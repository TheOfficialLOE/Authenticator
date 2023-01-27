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

const App = () => {
  const [timer, setTimer] = useState<number>(10);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {

    if (timer === 0)
      setTimer(10);

    const interval = setInterval(() => {
      setTimer(timer - 1);
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
            123456
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
          <CircularProgress determinate value={(10 - timer / 10) * 100} size="sm" sx={{
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
