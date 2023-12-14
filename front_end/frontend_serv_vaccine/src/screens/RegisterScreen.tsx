import React, { useEffect, useState } from 'react';
import {  Alert, Keyboard } from 'react-native';
import { Background } from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingScreen } from './LoadingScreen';

import { RegisterComponent } from '../components/RegisterComponent'
import { StackScreenProps } from '@react-navigation/stack';
import { removeErrorThunks } from '../store/slices/register';


interface Props extends StackScreenProps<any,any>{}

export const RegisterScreen = ({ navigation }: Props) => {
    
    const { isLoading, message, resp } = useSelector( (state: store ) => state.registerStore);
    const dispatch = useDispatch();

     const   onClearError = async () => {
    //   await dispatch(());
      await removeErrorThunks(dispatch)
      console.log('removiendo error createregister')
       } 

       
       

     useEffect(() => {
        if( message.length === 0 ) return;

        Alert.alert( message , '',[{
            text: 'Ok',
            onPress: onClearError
        }]);

        
        if (resp){
            navigation.replace('LoginScreen')
        }
    }, [ message ])



    const onLogin = () => {
        navigation.replace('LoginScreen')
    }
 
     const onRegister = async() => {
         Keyboard.dismiss();
     }



    return (
        <>
          {/* Background */} 
     <Background></Background>
    
     {   ( isLoading ) && <LoadingScreen /> }          
     <RegisterComponent onLogin={ onLogin } onRegisterScreen={() => onRegister()} ></RegisterComponent>  
      

           
        </>
    )
}



