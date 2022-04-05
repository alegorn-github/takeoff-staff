import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TContact = {
    id: number;
    name: string,
    phone: string,
}

const Contacts:TContact[] = [];

const contacts = createSlice({
    name: 'contacts',
    initialState: Contacts,
    reducers: {
        addContact:(state,action:PayloadAction<TContact>) => {
            state.push(action.payload);
        },
        editContact:(state,action:PayloadAction<TContact>) => {
            const index = state.findIndex((contact)=>contact.id === action.payload.id)
            if (index >= 0){
                state.push(action.payload);
            }
        },
        deleteContact: (state,action:PayloadAction<number>) => {
            state = state.filter((contact)=>contact.id !== action.payload);
        }
    }
})

export default contacts;
  