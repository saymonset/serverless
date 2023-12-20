import React, { useState} from 'react'
import { View } from 'react-native'
import { useEffect } from 'react';
import appointments from '../interfaces/nextAppointments-interfaces';


export const useNextAppointments = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ nextAppointments, setNextAppointments] = useState< NextAppointments[] >( appointments )

    const loadInfo = async () => {
         setIsLoading(true);
         const data = appointments;
         setNextAppointments(data);
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
