import { configureStore } from '@reduxjs/toolkit';
import contacts from './contacts';
import { user } from './user';

const store = configureStore({
    reducer: {
        contacts: contacts.reducer,
        user: user.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;