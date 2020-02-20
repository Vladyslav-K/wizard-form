import Dexie from "dexie";

const database = new Dexie("UsersData");

database.version(1).stores({
  temporaryUserData: "++keyPath, username, email, firstName, lastName",
  userList: "++id, username, email, firstName, lastName"
});

export default database;
