import { useContext, FormEvent } from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import db from "../db";
import { nanoid } from "nanoid";
import { ModalContext, ModalState } from "../ModalContext";
import { toast } from "react-toastify";

const isBase32 = (value: string) => {
  const regex = /^([A-Z2-7=]{8})+$/;
  return regex.test(value);
}

const CodeForm = () => {
  const {
    modalState,
    id,
    name,
    secret,
    setName,
    setSecret,
    closeModal
  } = useContext(ModalContext);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (name.length >= 20 || !isBase32(secret)) {
    //   return;
    // }

    if (name.length === 0) {
      toast.error("Name can't be empty.");
      return;
    }

    if (name.length >= 20) {
      toast.error("Name too large.");
      return;
    }

    if (!isBase32(secret)) {
      toast.error("Secret isn't valid");
      return;
    }

    if (modalState === ModalState.Adding) {
      db.codes.add({
        id: nanoid(8),
        name,
        secret
      });
    }

    if (modalState === ModalState.Editing) {
      db.codes.update(id, {
        name,
        secret
      })
    }

    closeModal();
    setName("");
    setSecret("");
  }

  return <form onSubmit={onFormSubmit}>
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input autoFocus onChange={(value => setName(value.currentTarget.value))} value={name}/>
      </FormControl>
      <FormControl>
        <FormLabel>Secret</FormLabel>
        <Input onChange={(value => setSecret(value.currentTarget.value))} value={secret}/>
      </FormControl>
      <Button type="submit">Submit</Button>
    </Stack>
  </form>
};

export default CodeForm;
