import { configureStore } from '@reduxjs/toolkit';
import contacts from './contacts';

const store = configureStore({
    reducer: {
        contacts: contacts.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;