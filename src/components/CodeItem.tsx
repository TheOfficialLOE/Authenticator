import { useState, useEffect, useContext } from "react";
import db, { ICode } from "../db";
import totp from "totp-generator";
import { Box, Card, CircularProgress, IconButton, ListItemDecorator, Menu, MenuItem, Typography } from "@mui/joy";
import CopyIcon from "./icons/CopyIcon";
import ThreeDotsIcon from "./icons/ThreeDotsIcon";
import { ModalContext } from "../ModalContext";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import { toast } from "react-toastify";
import createBreakpoints from "@mui/system/createTheme/createBreakpoints";

const DURATION = 60;

const getCurrentSeconds = () => {
  return Math.round(new Date().getTime() / 1000.0);
};

const copyToClipBoard = async (value: string) => {
  await navigator.clipboard.writeText(value);
};
const CodeItem = (props: { code: ICode }) => {
  const [updatingIn, setUpdatingIn] = useState<number>(DURATION);
  const [password, setPassword] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState(null);
  const isAnchorElOpen = Boolean(anchorEl);
  const {
    openModalForEditing
  } = useContext(ModalContext);

  const breakPoints = createBreakpoints({  });

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdatingIn(DURATION - (getCurrentSeconds() % DURATION));
      setPassword(totp(props.code.secret, {
        period: DURATION
      }));
    }, 1000);

    setUpdatingIn(DURATION - (getCurrentSeconds() % DURATION));
    setPassword(totp(props.code.secret, {
      period: DURATION
    }));

    return () => {
      clearInterval(interval);
    }
  });

  // @ts-ignore
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCopy = () => {
    copyToClipBoard(password);
    toast.success("Code copied to clipboard.");
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    openModalForEditing(props.code);
  };

  const handleDelete = () => {
    db.codes.delete(props.code.id);
    handleCloseMenu();
  };

  return <Card row invertedColors variant="outlined" sx={{
    m: 1,
    [breakPoints.up("md")]: {
      width: 240
    }
  }}>
    <Box component="div">
      <Typography>
        {props.code.name}
      </Typography>
      <Typography level="h3" fontWeight="bold" color="primary">
        {password}
      </Typography>
    </Box>
    <Box component="div" ml="auto" mt={-0.5} display="flex" flexDirection="column">
      <Box component="div">
        <IconButton size="sm" variant="plain" sx={{
          width: 16,
          height: 16
        }} onClick={handleCopy}>
          <CopyIcon/>
        </IconButton>
        <IconButton size="sm" variant="plain" sx={{
          width: 16,
          height: 16
        }} onClick={handleOpenMenu}
                    id="positioned-button"
                    aria-controls={isAnchorElOpen ? 'positioned-menu' : undefined}
                    aria-haspopup="true"
        >
          <ThreeDotsIcon />
        </IconButton>
        <Menu
          id="positioned-menu"
          anchorEl={anchorEl}
          open={isAnchorElOpen}
          onClose={handleCloseMenu}
          aria-labelledby="positioned-button"
        >
          <MenuItem onClick={handleEdit}>
            <ListItemDecorator>
              <EditIcon />
            </ListItemDecorator>{' '}
            Edit Code
          </MenuItem>
          <MenuItem onClick={handleDelete} variant="soft" color="danger">
            <ListItemDecorator sx={{ color: 'inherit' }}>
              <DeleteIcon />
            </ListItemDecorator>{' '}
            Delete
          </MenuItem>
        </Menu>
      </Box>
      <CircularProgress determinate value={(DURATION - updatingIn / DURATION) * 100} size="sm" sx={{
        ml: "auto",
        mr: 0.8,
        mt: 0.5
      }}/>
    </Box>
  </Card>
};

export default CodeItem;
