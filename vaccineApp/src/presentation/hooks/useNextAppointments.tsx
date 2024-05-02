import React, { useEffect, useState } from 'react'
import appointments, { NextAppointments } from '../../infrastructure/interfaces/nextAppointments-interface';

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
