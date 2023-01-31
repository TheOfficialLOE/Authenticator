import Dexie from "dexie";

type Code = {
  id: string;
  name: string;
  secret: string;
}

export class SafePlaceDB extends Dexie {
  codes!: Dexie.Table<Code, string>;

  constructor() {
    super("SafePlaceDB");
    this.version(1).stores({
      codes: "id, name, secret"
    });
  }
}
