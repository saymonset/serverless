import { AnyAction } from 'redux';

import vaccinesApi from '../../../api/vaccinesApi'
import {  setPokemons, startLoadingPokemons } from './pokemonSlice'



export const getPokemons = ( page = 0 ) => {
    return async ( dispatch, getState) => {
        dispatch( startLoadingPokemons())
        // TODO: realizar peticion http
        const { data } = await vaccinesApi.get(`ads/2/ ${ page }`)
        const { ads } = data;
    //    console.log({page})
       // console.log(JSON.stringify(ads))

        dispatch( setPokemons({ pokemons: ads, page: page + 2}) );
    }

}

// import { AnyAction } from 'redux';

// export const getPokemons = (page = 0) => {
//   return async (dispatch: (action: AnyAction) => void, getState: any) => {
//     dispatch(startLoadingPokemons());

//     // TODO: perform HTTP request

//     // dispatch(setPokemons());
//   };
// };