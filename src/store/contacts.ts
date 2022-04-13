import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import store, { RootState } from '.';

export type TContact = {
    id: string;
    name: string,
    phone: string,
}

const Contacts:TContact[] = [
    {name:'sss',phone:'sss',id:'fuuphv41x3b'}    
];

const contacts = createSlice({
    name: 'contacts',
    initialState: Contacts,
    reducers: {
        editContact:(state,action:PayloadAction<TContact>) => {
            const index = state.findIndex((contact)=>contact.id === action.payload.id);
            console.log('store:',action.payload,index);
            if (index >= 0){
                state[index] = action.payload;
            }
            else {
                state.push({...action.payload, id:Math.random().toString(36).substring(2,15)});
            }
        },
        deleteContact: (state,action:PayloadAction<string>) => {
            console.log('delete', action.payload,state.filter((contact)=>contact.id !== action.payload));
            const index = state.findIndex((contact)=>contact.id === action.payload);
            if (index >=0){
                state.splice(index,1);
            }
        }
    }
})

export const {editContact,deleteContact} = contacts.actions;

export const selectContacts = (searchString?:string) => (state: RootState)=>state.contacts.filter((contact)=> searchString ? (contact.name + ' ' + contact.phone).search(searchString) >= 0 : true);

export default contacts;
  