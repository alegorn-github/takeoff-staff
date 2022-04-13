import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import store, { RootState } from ".";

export type TUser = {
    user: string|null,
    key: string|null,
}

const initial:TUser = {
    user: null,
    key: null,
}

export const user = createSlice({
    name: 'user',
    initialState: initial,
    reducers:{
        setUser:(state,action:PayloadAction<TUser>) =>{
            state.user = action.payload.user;
            state.key = action.payload.key;
        },
        resetUser:(state) =>{
            return {...initial};
        }
    },
});

export const {setUser,resetUser} = user.actions;
export const selectUser = (state:RootState) => state.user;