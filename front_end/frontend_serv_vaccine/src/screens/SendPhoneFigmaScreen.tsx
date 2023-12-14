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
import {  removeErrorSmsThunks } from '../store/slices/sendSms/index' ;
import {  removeErrorThunks } from '../store/slices/register/index';
import { ModalMessageComponent } from '../components/ModalMessageComponent';
import { BackePageComponente } from '../components/BackePageComponente';


interface Props extends StackScreenProps<any, any> {}


export const SendPhoneFigmaScreen = ({ navigation }: Props) => {

  const {  message, isSendCode , token, resp } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const onInputChange = (value:any) => {
    setInputValue( value );
}
    



            const cerrarModal = () => {
              setIsVisible(false);
              //Borramos mensajes del thrunk
              onClearError();
            
              if (isSendCode){
                navigation.replace('SendCodeFigmaScreen');
              }
              if (token){
                  navigation.replace('RegistrodatosFigmaScreen');
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
           
           {/**  Boton regreso */}
           <BackePageComponente navigation={navigation} page="LoginFigmaScreen" />

  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                
              <View style={ stylesFigma.formContainer }> 

                            <View style={{flex:1}}>
                                        <HeaderTitleFigma title="Ingresa tu número de teléfono" 
                                                                            marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={20}
                                                                            ></HeaderTitleFigma>
                                        <HeaderTitleFigma title="Te enviaremos un mensaje SMS para verificar tu número de teléfono" 
                                                                            marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={70}
                                                                            type='small'
                                                                            ></HeaderTitleFigma>
                                        <HeaderTitleFigma title="Número de teléfono" 
                                                                                          marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                                          marginBottom={(Platform.OS === 'ios') ? 10: 0}
                                                                                          stylesFigma={stylesFigma}
                                                                                          type='small'
                                                                                          ></HeaderTitleFigma>
                  
                                <SendPhonFigmaComponent navigation = { navigation }></SendPhonFigmaComponent>

                               
                                { isVisible && (<ModalMessageComponent getValor = { () => cerrarModal() }
                                                                      message={`${message}`}
                                                />)}
                        </View>
                             
                          
              </View>  
            </KeyboardAvoidingView>   


          
    </>
  )
}
