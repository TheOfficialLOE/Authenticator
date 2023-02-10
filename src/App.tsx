import { useState, useEffect } from "react";
import { Box, useColorScheme } from "@mui/joy";
import db, { ICode } from "./db";
import CodesList from "./components/CodesList";
import Header from "./components/Header";
import ModalForm from "./components/ModalForm";
import AddButton from "./components/AddButton";

const App = () => {
  const { mode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  const [codes, setCodes] = useState<ICode[]>([]);
  
  useEffect(() => {
    setMounted(true);

    db.codes.toArray().then(codes => {
      setCodes(codes)
    });
  });

  if (!mounted) {
    return null;
  }

  return <Box component="div" bgcolor={(mode === "dark") ? "rgb(10, 25, 41)" : ""} minHeight="100vh">
    <Header />
    <CodesList codes={codes} />
    <AddButton />
    <ModalForm />
  </Box>
};

export default App;
