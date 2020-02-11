import Dexie from "dexie";

const database = new Dexie("UsersData");

database.version(1).stores({
  accountData: "++id, username, password, passwordConfirmation, avatar",

  profileData:
    "++id, firstName,  birthDate,  lastName,  address,  gender,  email"
});

export default database;
