import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackgroundSendPhoneFigma } from '../components/BackgroundSendPhoneFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { reEnviarCodeThunks, checkCodeThunks, removeErrorSmsThunks } from '../store/slices/sendSms/sendSmsThunks'
import {  removeErrorThunks } from '../store/slices/register/index';
import { ModalMessageComponent } from '../components/ModalMessageComponent';
import { NeedHelpContact } from '../components/NeedHelpContact';
import { SendCodeFigmaReusableComponent } from '../components/SendCodeFigmaReusableComponent';
import { LoadingScreen } from './LoadingScreen';
import { BackePageComponente } from '../components/BackePageComponente';

interface Props extends StackScreenProps<any, any> {}


export const SendCodeFigmaRecoveryScreen2 = ({ navigation }: Props) => {

  //const {  message, isSendCode , token } = useSelector( (state: store ) => state.sendSmsStore);
  const [isVisible, setIsVisible] = useState(false);
  const [ codigo, setCodigo ] = useState('');
  const { isLoading, message, phone, token, ci, resp } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();


  const reEnviarCode = async() => {
    Keyboard.dismiss();
  
    await dispatch(reEnviarCodeThunks( phone ));
}

const onInputChange = (value) => {
  setCodigo( value );
}

    const onSubmit = async ( event ) => {
      event.preventDefault();
      if( codigo.trim().length <= 1) return;
        await dispatch(checkCodeThunks( phone, codigo.trim()));
    }

 
     
    const cerrarModal = () => {
          setIsVisible(false);
          //Borramos mensajes del thrunk
          onClearError();
          setCodigo('');
         
           if (token){
               navigation.replace('ConfirmPasswordRecoveryFigmaScreen3');
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
          <BackePageComponente navigation={navigation} page="SendPhoneFigmaScreen" />
  
  
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
                                              <HeaderTitleFigma title="Para completar la recuperación de tu cuenta, por favor, ingresa el código
                                              de activación de 6 dígitos que fue enviado a +00 0000-000." 
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
                                                                                textAlign='left' 
                                                                                ></HeaderTitleFigma>
                                            <View style={{ 
                                                flex:1}}>
                                                <TextInput 
                                                        placeholder="123456 |"
                                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                                        underlineColorAndroid="rgba(0,0,0,0.4)"
                                                        style={[ 
                                                            stylesFigma.inputField,
                                                            ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                                                            {marginHorizontal:30}
                                                        ]}
                                                        selectionColor="white"
                                                        onChangeText={ (value) => onInputChange(value) }
                                                        value={ codigo }
                                                        onSubmitEditing={ () => {} }
                                                        autoCapitalize="none"
                                                        autoCorrect={ false }
                                                        />
                                            </View>

                                            <View style={ {
                                                        marginTop:30,
                                                        justifyContent:'flex-start',
                                                        alignItems:'center',
                                                        flex:1}}> 
                                                        <HeaderTitleFigma title="¿No has recibido ningún código?" 
                                                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                                                            marginBottom={(Platform.OS === 'ios') ? 0: 0}
                                                                                                            stylesFigma={stylesFigma}
                                                                                                            type='small'
                                                                                                            ></HeaderTitleFigma>
                                                            <View style={{marginTop:2}}>
                                                              <TouchableOpacity onPress={() => reEnviarCode()}>
                                                                    <Text style={{ color: 'blue' }}>Enviar de nuevo</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                            </View>                            
                  
                                      { ( isLoading ) && <LoadingScreen />  } 

                                              <View style={{
                                                          flex:1,
                                                          justifyContent:'center',
                                                            ...stylesFigma.buttonContainer,
                                                              marginTop:20
                                                              } }>
                                                          <TouchableOpacity
                                                              activeOpacity={ 0.8 }
                                                              style={ stylesFigma.button }
                                                              onPress={ onSubmit }
                                                          >
                                                              <Text style={ stylesFigma.buttonText } >Siguiente</Text>
                                                          </TouchableOpacity>
                                              </View>              
                               <NeedHelpContact></NeedHelpContact>
                                { isVisible && (<ModalMessageComponent getValor = { () => cerrarModal() }
                                                                      message={`${message}`}
                                                />)}
                             </View>
              </View>  
            </KeyboardAvoidingView>   


        
       
    </>
  )
}
