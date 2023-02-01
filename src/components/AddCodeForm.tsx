import * as React from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import db from "../db";
import { nanoid } from "nanoid";

const isBase32 = (value: string) => {
  const regex = /^([A-Z2-7=]{8})+$/;
  return regex.test(value);
}

const AddCodeForm = (props: { setModalOpen: (value: boolean) => void }) => {
  const [name, setName] = React.useState<string>("");
  const [secret, setSecret] = React.useState<string>("");

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length >= 20 || !isBase32(secret))
      return;

    db.codes.add({
      id: nanoid(8),
      name,
      secret
    });

    props.setModalOpen(false);
    setName("");
    setSecret("");
  }

  return <form onSubmit={onFormSubmit}>
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input autoFocus required onChange={(value => setName(value.currentTarget.value))}/>
      </FormControl>
      <FormControl>
        <FormLabel>Secret</FormLabel>
        <Input required onChange={(value => setSecret(value.currentTarget.value))}/>
      </FormControl>
      <Button type="submit">Submit</Button>
    </Stack>
  </form>
};

export default AddCodeForm;
