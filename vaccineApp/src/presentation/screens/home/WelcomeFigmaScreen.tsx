
import React, { useContext } from 'react'
import {  Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
 
 


export const WelcomeScreen = () => {
      {/*  Cargamos data en el contexto */}
    
     
  
 
  return (
 
    <>
       
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                <View><Text>Hola mundo</Text></View>
               
            </KeyboardAvoidingView>   
       
    </>
  )
}
