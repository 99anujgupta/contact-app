// src/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

const initialState: User[] = [
 
];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    editUser: (state, action) => {
      const { id, name, email} = action.payload;
      const existingUser = state.find(user => user.id === id);
      if(existingUser){
        existingUser.name = name;
        existingUser.email = email;
      }
    },
    deleteUser: (state, action) =>{
      const{id} =action.payload;
      const existingUser = state.find(user => user.id === id);
      if(existingUser){
        return state.filter(user => user.id !== id);
      }
    }
  },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

