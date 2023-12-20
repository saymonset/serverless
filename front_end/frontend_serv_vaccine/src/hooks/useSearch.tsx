import { useState, useEffect } from 'react';
import vaccinesApi from '../api/vaccinesApi';
import { Gender } from '../interfaces/gender-interfaces';
import { NextAppointments } from '../interfaces/nextAppointments-interfaces';
import { useNextAppointments } from './useNextAppointments';

export const useSearch = (  ) => {

    const { nextAppointments } = useNextAppointments();
    const [ isFetching, setisFetching ] = useState(true)
    const [ data, setData ] = useState< NextAppointments[] >([])

    const loadData = async() => {
        let  resp =  vaccinesApi.get<Gender>(`/genders/20/0`);
       // const resp = await pokemonApi.get<PokemonFull>(`https://pokeapi.co/api/v2/pokemon/${ id }`);
        setData( nextAppointments );
        setisFetching(false);
    }

    useEffect(() => {
        loadData();
    }, [])

    return {
        isFetching,
        data
    }
}
