import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        page: 0,
        pokemons: [],
        isLoading: false,
    },
    reducers: {
        startLoadingPokemons: (state, /* action */ ) => {
            state.isLoading = true;
        },
        setPokemons: ( state, { payload } ) => {
            state.isLoading = false;
            state.page = payload.page;
            state.pokemons = payload.pokemons;
            console.log({payload})
        }
    }
});
// Action creators are generated for each case reducer function
export const { startLoadingPokemons, setPokemons  } = pokemonSlice.actions;