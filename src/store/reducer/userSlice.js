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
      state.push({ id: state.length + 1, user: action.payload });
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
      state.splice(
        state.findIndex((user) => user.id === action.payload),
        1
      );
      localStorage.setItem("users", JSON.stringify(state));
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
