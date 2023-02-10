import Dexie from "dexie";

export interface ICode {
  id: string;
  name: string;
  secret: string;
}

class AuthenticatorDB extends Dexie {
  codes!: Dexie.Table<ICode, string>;

  constructor() {
    super("AuthenticatorDB");
    this.version(1).stores({
      codes: "id, name, secret"
    });
  }
}

export default new AuthenticatorDB();
