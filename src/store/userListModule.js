import { createSlice, createAction } from "@reduxjs/toolkit";

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
    }
  }
});

export const searchUsersByName = createAction("SEARCH_USERS_BY_NAME");
export const getTestUsers = createAction("GET_TEST_USERS");
export const updateUser = createAction("UPDATE_USER");

const { actions, reducer } = temporaryUserModule;

export const {
  deleteUserFromList,
  getUsersWithDB,
  addUserToList,
  setTotal
} = actions;

export default reducer;
