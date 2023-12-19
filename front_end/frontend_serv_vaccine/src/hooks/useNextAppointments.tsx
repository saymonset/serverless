import React, { useState} from 'react'
import { View } from 'react-native'
import { useEffect } from 'react';
import appointments, { NextAppointments } from '../interfaces/nextAppointments-interfaces';


export const useNextAppointments = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ nextAppointments, setNextAppointments] = useState< NextAppointments[] >( [] )

    const loadInfo = async () => {
         setIsLoading(true);
         const data = appointments;

         setNextAppointments(data);

         console.log( { data });
         setIsLoading(false);
    }

    useEffect( () => {
        loadInfo();
    }, []);

  return  {
         nextAppointments,
         isLoading
  }
}
