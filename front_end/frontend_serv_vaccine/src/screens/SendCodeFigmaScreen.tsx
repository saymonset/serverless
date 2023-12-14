import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from '../hooks/useForm';
import { WhiteLogo } from '../components/WhiteLogo';
import { BackgroundSendPhoneFigma } from '../components/BackgroundSendPhoneFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import {  SendPhonFigmaComponent } from '../components/SendPhonFigmaComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SendCodeFigmaComponent } from '../components/SendCodeFigmaComponent';
import { removeErrorSmsThunks } from '../store/slices/sendSms/sendSmsThunks';
import {  removeErrorThunks } from '../store/slices/register/index';
import { ModalMessageComponent } from '../components/ModalMessageComponent';

interface Props extends StackScreenProps<any, any> {}


export const SendCodeFigmaScreen = ({ navigation }: Props) => {

  const {  message, isSendCode , token,resp } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [ inputValue, setInputValue ] = useState('');

  const onInputChange = (value:any) => {
      setInputValue( value );
  }
    
  const   onBack = async () => {
        Keyboard.dismiss();
        navigation.replace('SendPhoneFigmaScreen')
    }

    const cerrarModal = () => {
          setIsVisible(false);
          //Borramos mensajes del thrunk
          onClearError();
         
          if (token){
              navigation.replace('SeguridadFigmaScreen');
          }
    }

      const abrirModal = () => {
        setIsVisible(true);
      }

      const   onClearError = async () => {
            await removeErrorSmsThunks(dispatch);
            //Borra mensajees de registerScreen
            await removeErrorThunks(dispatch)
      } 

      {/* Solo para sacar mensajes de error por pantalla */}
      useEffect(() => {
          if( message.length === 0 ) return;
               // Si la respuesta es positiva entonces no sacamos ningun mensaje en el modal y nos vamos a otra pagina
               if (resp){
                cerrarModal();
              }else{
                abrirModal();
              }
      }, [ message ])

 
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
                <TouchableOpacity onPress={() => { onBack() }} style={{ marginTop: 0 }}>
                    <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
                </TouchableOpacity>
            </View>
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                
              <View style={ stylesFigma.formContainer }> 

                            <View style={{flex:1}}>
                                    <HeaderTitleFigma title="Revisa tu bandeja de mensajes" 
                                                                            marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={20}
                                                                            ></HeaderTitleFigma>
                                        <HeaderTitleFigma title="Para completar la verificación de tu número de teléfono, 
                                        por favor, ingresa el código deactivación de 6 digitos" 
                                                                            marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={70}
                                                                            type='small'
                                                                            ></HeaderTitleFigma>
                              <HeaderTitleFigma title="Ingresa el código" 
                                                                                marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                                marginBottom={(Platform.OS === 'ios') ? 10: 0}
                                                                                stylesFigma={stylesFigma}
                                                                                type='small'
                                                                                textAlign='center' 
                                                                                ></HeaderTitleFigma>

                                                                                
                             
                  
                                              
                                <SendCodeFigmaComponent navigation = { navigation }></SendCodeFigmaComponent>

                                { isVisible && (<ModalMessageComponent getValor = { () => cerrarModal() }
                                                                      message={`${message}`}
                                                />)}
                              
                           
                             </View>
                             
                          
              </View>  
            </KeyboardAvoidingView>   


        
       
    </>
  )
}
