import { createSlice } from "@reduxjs/toolkit";

const UIModule = createSlice({
  name: "loading",

  initialState: {
    isLoading: false,
    isError: false
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.isError = false;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    }
  }
});

const { actions, reducer } = UIModule;

export const { setLoading, setError } = actions;

export default reducer;
