import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feedSlice",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      return null;
    },
    removeUserFromFeed: (state, action) => {
      const newArr = state.filter((user) => user._id !== action.payload);
      return newArr;
    },
  },
});

export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
