import * as React from "react";
import db, { ICode } from "../db";
import totp from "totp-generator";
import { Box, Card, CircularProgress, IconButton, ListItemDecorator, Menu, MenuItem, Typography } from "@mui/joy";
import CopyIcon from "./icons/CopyIcon";
import ThreeDotsIcon from "./icons/ThreeDotsIcon";
import { useContext } from "react";
import { ModalContext } from "../ModalContext";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

const getCurrentSeconds = () => {
  return Math.round(new Date().getTime() / 1000.0);
};

const copyToClipBoard = async (value: string) => {
  await navigator.clipboard.writeText(value);
};
const CodeItem = (props: { code: ICode }) => {
  const [updatingIn, setUpdatingIn] = React.useState<number>(10);
  const [passCode, setPassCode] = React.useState<string>("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isAnchorElOpen = Boolean(anchorEl);
  const {
    openModalForEditing
  } = useContext(ModalContext);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setUpdatingIn(10 - (getCurrentSeconds() % 10));
      setPassCode(totp(props.code.secret, {
        period: 10
      }));
    }, 1000);

    setUpdatingIn(10 - (getCurrentSeconds() % 10));
    setPassCode(totp(props.code.secret, {
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

  const handleCopy = () => {
    copyToClipBoard(passCode);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    openModalForEditing(props.code);
  };

  const handleDelete = () => {
    db.codes.delete(props.code.id);
    handleClose();
  };

  return <Card row invertedColors variant="outlined" sx={{
    m: 1
  }}>
    <Box component="div">
      <Typography>
        {props.code.name}
      </Typography>
      <Typography level="h3" fontWeight="bold" color="primary">
        {passCode}
      </Typography>
    </Box>
    <Box component="div" ml="auto" display="flex" flexDirection="column">
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
        }} onClick={handleClick}
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
          onClose={handleClose}
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
      {/*<Box component={"div"} className="timer" ml="auto" mr={0.8} mt={0.5}/>*/}
      <CircularProgress determinate value={(10 - updatingIn / 10) * 100} size="sm" sx={{
        ml: "auto",
        mr: 0.8,
        mt: 0.5
      }}/>
    </Box>
  </Card>
};

export default CodeItem;
