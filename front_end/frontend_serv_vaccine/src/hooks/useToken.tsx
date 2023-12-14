import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

/* TODO Renovamos el token÷÷\*/
export const useToken = () => {

    const { token  } = useSelector( (state: store ) => state.loginStore);
   
    

    let renovarToken = async() => {
      if (token){
        await AsyncStorage.setItem('token', token ); 
      }
      return token;
  }

  return {
    token,
    renovarToken
  }
}
