import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
export const useLogin = () => {
    const {  token   } = useSelector((state: store) => state.loginStore);
    let renovarToken = async() => {
        if (token){
          await AsyncStorage.setItem('token', token ); 
        }
        return token;
    }
  
    return {
      token,
      renovarToken
    }}
