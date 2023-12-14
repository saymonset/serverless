import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import {  Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
 
import { BackgroundSendPhoneFigma } from '../components/BackgroundSendPhoneFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RegistrodatosFigmaComponent } from '../components/RegistrodatosFigmaComponent';
import { useDispatch, useSelector } from 'react-redux';
import { removeErrorThunks } from '../store/slices/register/registerThunks';
import { RegisterComponent } from '../components/RegisterComponent';
import { ModalMessageComponent } from '../components/ModalMessageComponent';
 


interface Props extends StackScreenProps<any, any> {}


export const RegistrodatosFigmaScreen = ({ navigation }: Props) => {
 

  const   onBack = async () => {
    Keyboard.dismiss();
    navigation.replace('SeguridadFigmaScreen')
  }
 
    const [isVisible, setIsVisible] = useState(false);
    const {  message, resp } = useSelector( (state: store ) => state.registerStore);
    const dispatch = useDispatch();

      const   onClearError = async () => {
          await removeErrorThunks(dispatch)
          console.log('removiendo error createregister')
      } 
 
      const cerrarModal = () => {
        setIsVisible(false);
        //Borramos mensajes del thrunk
        onClearError();

          if (resp){
              navigation.replace('LoginFigmaScreen')
          }
      }

       const abrirModal = () => {
          setIsVisible(true);
      }

     useEffect(() => {
        if( message.length === 0 ) return;

         // Si la respuesta es positiva entonces no sacamos ningun mensaje en el modal y nos vamos a otra pagina
         if (resp){
            cerrarModal();
          }else{
            abrirModal();
          }
       
    }, [ message ])



    const onLogin = () => {
        navigation.replace('LoginScreen')
    }
 
     const onRegister = async() => {
         Keyboard.dismiss();
         console.log({message, resp})
     }


 
  return (
    <>
          {/* Background */} 
           <BackgroundSendPhoneFigma></BackgroundSendPhoneFigma>

           <View style={{ flexDirection: 'row',
                           justifyContent:'flex-start',
                           marginBottom:0, 
                           marginLeft:15,  
                           marginHorizontal:1, 
                           marginTop:( Platform.OS === 'ios') ? 30: 30 }}>
                <TouchableOpacity onPress={() => onBack() } style={{ marginTop: 0 }}>
                    <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
                </TouchableOpacity>
            </View>
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                
              <View style={ stylesFigma.formContainer }> 

                            <View style={{flex:1}}>
                                              <HeaderTitleFigma title="Datos personales" 
                                                                                      marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                                      stylesFigma={stylesFigma}
                                                                                      type='big'
                                                                                      marginBottom={20}
                                                                                      ></HeaderTitleFigma>
                                              <HeaderTitleFigma title="Por favor, llena los datos personales, luego
                                              podras agregar perfiles de menores de edad si lo deseas" 
                                                                                                marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                                                marginBottom={(Platform.OS === 'ios') ? 10: 0}
                                                                                                stylesFigma={stylesFigma}
                                                                                                type='small'
                                                                                                textAlign='left' 
                                                                                                ></HeaderTitleFigma>
                                              
                                              <RegistrodatosFigmaComponent  onLogin={ onLogin } onRegisterScreen={() => onRegister()}></RegistrodatosFigmaComponent>  
                                              
                                              { isVisible && (<ModalMessageComponent getValor = { () => cerrarModal() }
                                                                      message={`${message}`}
                                                />)}
                                                      
                                                
                                      
                             </View>
                             
                          
              </View>  
            </KeyboardAvoidingView>   


       
       
    </>
  )
}
