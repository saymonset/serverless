import { useState, useEffect } from 'react';
import { NextAppointments } from '../interfaces/nextAppointments-interfaces';
import { useNextAppointments } from './useNextAppointments';

export const useSearch = (  ) => {

    const { nextAppointments } = useNextAppointments();
    const [ isFetching, setisFetching ] = useState(true)
    const [ data, setData ] = useState< NextAppointments[] >([])

    const loadData = async() => {
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
