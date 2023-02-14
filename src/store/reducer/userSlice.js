import { createSlice } from "@reduxjs/toolkit";
const initialState =
  (localStorage.getItem("users") &&
    JSON.parse(localStorage.getItem("users"))) ||
  [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      // Generate a new unique ID for the user
      const newId = state.length > 0 ? state[state.length - 1].id + 1 : 1;
      state.push({ id: newId, user: action.payload });
      localStorage.setItem("users", JSON.stringify(state));
    },

    updateUser: (state, action) => {
      const userIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      state[userIndex].user = action.payload.user;
      localStorage.setItem("users", JSON.stringify(state));
    },

    deleteUser: (state, action) => {
      const userIndex = state.findIndex((user) => user.id === action.payload);
      if (userIndex !== -1) {
        state.splice(userIndex, 1);
        localStorage.setItem("users", JSON.stringify(state));
      }
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
