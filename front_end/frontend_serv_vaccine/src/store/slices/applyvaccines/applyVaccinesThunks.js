import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {   startLoadingApplyVaccine, stopLoadingApplyVaccine, setDependentById } from './applyVaccinesSlice'
   

export const dependentByIdThunks = ( id:String, token: String ): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
      dispatch( startLoadingApplyVaccine());
      if (token) {
        await AsyncStorage.setItem('token', token ); 
      }
        const payload = id;
         dispatch( setDependentById(payload) );
         dispatch( stopLoadingApplyVaccine() );
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
} 
