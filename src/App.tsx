import * as React from "react";

import {
  Box,
  Card, CircularProgress,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography
} from "@mui/joy";
import {useEffect, useState} from "react";

/*
* responsive
* */


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

  console.log(timer);

  // @ts-ignore
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return <Box component="div" mt={14}>
    <List>
      <ListItem>
        <Card row invertedColors variant="outlined" sx={{
          width: "100%"
        }}>
          <Box component="div">
            <Typography>
              Twitter Code
            </Typography>
            <Typography level="h3" textAlign="center" fontWeight="bold" color="primary">
              123456
            </Typography>
          </Box>
          <Box component="div" ml="auto" display="flex" flexDirection="column">
            <Box component="div">
              <IconButton size="sm" variant="plain" sx={{
                width: 16,
                height: 16
              }}>
                <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
              </IconButton>
              <IconButton size="sm" variant="plain" sx={{
                width: 16,
                height: 16
              }} onClick={handleClick}
                          id="positioned-demo-button"
                          aria-controls={open ? 'positioned-demo-menu' : undefined}
                          aria-haspopup="true"
              >
                <svg width={16} height={16} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
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
      </ListItem>
    </List>
  </Box>
};

export default App;
