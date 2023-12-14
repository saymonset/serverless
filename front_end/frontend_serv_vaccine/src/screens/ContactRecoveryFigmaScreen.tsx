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
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { BackePageComponente } from '../components/BackePageComponente';
// import { SeguridadFigmaReusableComponent } from '../components/SeguridadFigmaReusableComponent';


interface Props extends StackScreenProps<any, any> {}


export const ContactRecoveryFigmaScreen = ({ navigation }: Props) => {

  const {  message, isSendCode , token } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const onInputChange = (value:any) => {
    setInputValue( value );
}
    
  const   onBack = async () => {
        Keyboard.dismiss();
        navigation.replace('WelcomeScreen')
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
            abrirModal();
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
                                        <HeaderTitleFigma title="Contacto" 
                                                                            marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={15}
                                                                            ></HeaderTitleFigma>

                                          <HeaderTitleFigma title="Correo electrónico" 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={0}
                                                                            type='small'
                                                                            isAlertaAsterisco
                                                                            ></HeaderTitleFigma>
                                         {/* <SeguridadFigmaReusableComponent navigation = { navigation }></SeguridadFigmaReusableComponent> */}

                                          <HeaderTitleFigma title="Mensaje" 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={0}
                                                                            type='small'
                                                                            isAlertaAsterisco
                                                                            ></HeaderTitleFigma>
                                       

                                         <View style={{flex:1}}></View>
                                          <View style={ { alignItems:'center', marginTop:0, marginBottom:30} }>
                                                <TouchableOpacity
                                                    activeOpacity={ 0.8 }
                                                    style={  [{...stylesFigma.button} ]}
                                                    onPress={ () =>{} }
                                                >
                                                    <Text style={ stylesFigma.buttonText } >Siguiente</Text>
                                                </TouchableOpacity>
                                           </View> 
                                         

                                                                                              
                        
                                       

                               
                                { isVisible && (<ModalMessageComponent getValor = { () => cerrarModal() }
                                                                      message={`${message}`}
                                                />)}
                        </View>
                             
                          
              </View>  
            </KeyboardAvoidingView>   


          
    </>
  )
}
