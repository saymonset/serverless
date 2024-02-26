import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loadVaccinesResponse, startVaccines, stopVaccines, store } from '../store/index'
import { Vaccine, VaccinesResponse } from '../interfaces/vaccines-interfaces';
import vaccinesApi from '../api/vaccinesApi';

export const useVaccine = () => {

  const dispatch = useDispatch();
  const {  
    isLoading ,
    resp,
    message,
    vaccines
     } = 
    useSelector((state: store) => state.vaccineStore);

    const loadVaccinesResponseUse = async(token:string) => {
      if (token) {
        await AsyncStorage.setItem('token', token);
      }

      
      
      const  { data }  = await vaccinesApi.get<VaccinesResponse>(`/vaccine/100/0/""`);

      const {  desde,
        limite,
        total,
        vaccines} = data;
      const payload = {
                        desde,
                        limite,
                        total,
                        vaccines
                      };
      dispatch(startVaccines());
      dispatch(loadVaccinesResponse(payload));
      dispatch(stopVaccines());
    }

  return {
    vaccines,
    isLoading ,
    resp,
    message,
    loadVaccinesResponseUse,
  }
}
