import Dexie from "dexie";

const database = new Dexie("UsersData");

database.version(1).stores({
  temporaryUserData: "++id",
  userList: "++id, username, email, firstName, lastName"
});

export default database;
