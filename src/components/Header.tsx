import { Box, Typography, IconButton, useColorScheme } from "@mui/joy";
import DarkIcon from "./icons/DarkIcon";
import LightIcon from "./icons/LightIcon";

const Header = () => {
    const { mode, setMode } = useColorScheme();
    
    return <Box component="div" p={8} display="flex" flexDirection="row" justifyContent="center" alignItems="center">
    <Typography level="h1">
      Authenticator
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
};

export default Header;