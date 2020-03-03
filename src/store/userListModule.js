import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  userList: [],
  total: 0
};

const temporaryUserModule = createSlice({
  name: "userList",

  initialState,

  reducers: {
    getUsersWithDB: (state, action) => {
      state.userList = action.payload || [];
      state.isLoading = false;
      state.isError = false;
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

    setLoading: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = true;
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
  setLoading,
  setTotal,
  setError
} = actions;

export default reducer;
