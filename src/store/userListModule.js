import { createSlice } from "@reduxjs/toolkit";

const temporaryUserModule = createSlice({
  name: "userList",

  initialState: {
    isLoading: false,
    isError: false,
    userList: [],
    total: 0
  },

  reducers: {
    getUsersWithDB: (state, action) => {
      state.userList = action.payload || [];
    },

    deleteUserFromList: (state, action) => {
      state.userList = state.userList.filter(
        user => user.id !== action.payload.id
      );
    },

    setTotal: (state, action) => {
      state.total = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.isError = false;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    searchUsersByName() {},

    addUserToList() {},

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
  setLoading,
  setError,
  setTotal
} = actions;

export default reducer;
