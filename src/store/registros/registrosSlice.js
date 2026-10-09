import { createSlice } from '@reduxjs/toolkit';

const defaultInitialState = {
    lista : null,
    cargandoLista : false
};

export const registrosSlice = createSlice({
    name: 'registros',
    initialState: defaultInitialState,
    reducers: {
        onListar : (state)=>{
            state.lista = null;
            state.cargandoLista = true;
        },
        okListar : (state, {payload})=>{
            state.lista = payload;
            state.cargandoLista = false;
        }
    }
});

export const {
    onListar, okListar
} = registrosSlice.actions;