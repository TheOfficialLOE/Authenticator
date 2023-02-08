import { ICode } from "../db";
import CodeItem from "./CodeItem";
import { Grid } from "@mui/joy";

const CodesList = (props: { codes: ICode[] }) => {
  return <Grid container justifyContent="space-between" direction={{
    xs: "column",
    md: "row"
  }}>
    {props.codes.map(code => <CodeItem code={code} />)}
  </Grid>
};

export default CodesList;
