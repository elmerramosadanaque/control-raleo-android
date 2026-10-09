import { configureStore } from '@reduxjs/toolkit'
import { authSlice, registrosSlice } from './';

export const store = configureStore({
    reducer : {
        auth : authSlice.reducer,
        registros : registrosSlice.reducer
    }
});