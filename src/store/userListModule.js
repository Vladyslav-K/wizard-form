import { createSlice } from "@reduxjs/toolkit";

const temporaryUserModule = createSlice({
  name: "userList",

  initialState: {
    userList: [],
    total: 0
  },

  reducers: {
    getUsersWithDB: (state, action) => {
      state.userList = action.payload || [];
    },

    addUserToList: (state, action) => {
      state.userList.push(action.payload);
    },

    deleteUserFromList: (state, action) => {
      state.userList = state.userList.filter(
        user => user.id !== action.payload.id
      );
    },

    setTotal: (state, action) => {
      state.total = action.payload;
    },

    searchUsersByName() {},

    getTestUsers() {},

    updateUser() {}
  }
});

const { actions, reducer } = temporaryUserModule;

export const {
  deleteUserFromList,
  searchUsersByName,
  getUsersWithDB,
  addUserToList,
  getTestUsers,
  updateUser,
  setTotal
} = actions;

export default reducer;
