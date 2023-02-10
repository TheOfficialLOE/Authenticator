import { ICode } from "../db";
import CodeItem from "./CodeItem";
import { Grid } from "@mui/joy";

const CodesList = (props: { codes: ICode[] }) => {
  return <Grid container direction={{
    xs: "column",
    md: "row"
  }} justifyContent="center">
    {props.codes.map(code => <CodeItem code={code} />)}
  </Grid>
};

export default CodesList;
