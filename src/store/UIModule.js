import { createSlice } from "@reduxjs/toolkit";

const UIModule = createSlice({
  name: "UI",

  initialState: {
    isLoading: false,
    isError: false,

    disabledTabs: {
      capabilitiesTab: true,
      contactsTab: true,
      profileTab: true
    }
  },

  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.isError = false;
    },

    setError: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    setDisabledTabs: (state, action) => {
      state.disabledTabs = { ...state.disabledTabs, ...action.payload };
    }
  }
});

const { actions, reducer } = UIModule;

export const { setLoading, setError, setDisabledTabs } = actions;

export default reducer;
