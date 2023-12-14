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
import {  changuePasswordThunks, removeErrorSmsThunks } from '../store/slices/sendSms/index' ;
import {  removeErrorThunks } from '../store/slices/register/index';
import { ModalMessageComponent } from '../components/ModalMessageComponent';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { BackePageComponente } from '../components/BackePageComponente';


interface Props extends StackScreenProps<any, any> {}


export const ConfirmPasswordRecoveryFigmaScreen3 = ({ navigation }: Props) => {

  const {  message, isSendCode , resp, phone, ci } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [ inputValue, setInputValue ] = useState('');
  const [ inputValue_II, setInputValue_II ] = useState('');

  const [secureText, setSecureText] = useState(true);
  const [showWarnings, setShowWarnings] = useState(false);
  const [secureText_II, setSecureText_II] = useState(true);
  const [showWarnings_II, setShowWarnings_II] = useState(false);


            const onSecurityInputChange = (value) => {
              if (value.length > 8) {
                  setShowWarnings(false);
                }
            }
            const onInputChange = (value:any) => {
                setInputValue( value );
            }

            const toggleSecureText = () => {
              setSecureText(!secureText);
            }

            const onSecurityInputChange_II = (value) => {
              if (value.length > 8) {
                  setShowWarnings_II(false);
                }
            }
            const onInputChange_II = (value:any) => {
                setInputValue_II( value );
            }

            const toggleSecureText_II = () => {
              setSecureText_II(!secureText_II);
            }
    
            

            const onSubmit = async ( event ) => {
                event.preventDefault();
                if( inputValue.trim().length <= 7){
                  setShowWarnings(true);
                  return;
                }
                if( inputValue_II.trim().length <= 7){
                  setShowWarnings_II(true);
                  return;
                }
                console.log({ci, phone})
                await dispatch(changuePasswordThunks( inputValue, inputValue_II, phone, ci ));
            }




            const cerrarModal = () => {
                setIsVisible(false);
                //Borramos mensajes del thrunk
                onClearError();
                if (resp){
                     navigation.replace('LoginFigmaScreen');
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

            {/* Solo para sacar mensajes de error por pantalla */}
          //   useEffect(() => {
          //     console.log('------lorenzo333--------88-----------');
              
          //     console.log({ ci, phone});
          //     console.log('-------------------------');
          // }, [])
 
  return (
    <>
          {/* Background */} 
           <BackgroundSendPhoneFigma></BackgroundSendPhoneFigma>
           
            {/**  Boton regreso */}
          <BackePageComponente navigation={navigation} page="SendCodeFigmaRecoveryScreen2" />
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                
              <View style={ stylesFigma.formContainer }> 

                            <View style={{flex:1}}>
                                        <HeaderTitleFigma title="Reestablece tu contraseña" 
                                                                            marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={15}
                                                                            ></HeaderTitleFigma>

                                          <HeaderTitleFigma title="Nueva contraseña" 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={0}
                                                                            type='small'
                                                                            isAlertaAsterisco
                                                                            ></HeaderTitleFigma>

                                            <View style={{ marginBottom:30, 
                                                            flexDirection:'column',
                                                            marginHorizontal:20}}> 
                                                    <View style={{ flexDirection:'row'}}>
                                                                        <View style={{flex:9, marginBottom:0}}>
                                                                                <TextInput 
                                                                                        placeholder="******"
                                                                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                                                                        underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                                        secureTextEntry={secureText}
                                                                                        maxLength={16}
                                                                                        style={[ 
                                                                                            stylesFigma.inputField,
                                                                                            ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                                                        ]}
                                                                                        selectionColor="white"
                                                                                        onChangeText={ (value) => {
                                                                                            onInputChange(value);
                                                                                            onSecurityInputChange( value );
                                                                                        } }
                                                                                        value={ inputValue }
                                                                                        onSubmitEditing={ onSubmit }
                                                                                        autoCapitalize="none"
                                                                                        autoCorrect={ false }
                                                                                        />
                                                                        </View>
                                                                        <View style={{flex:1, marginLeft:20}}>
                                                                            <TouchableOpacity onPress={toggleSecureText}>
                                                                                <Ionicons name={secureText ? 'eye' : 'eye-off'} size={24} color="black" />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                    </View>
                                                    { showWarnings && (<View style={{flexDirection:'row', marginTop:10}}>
                                                                                    <Ionicons style={{ marginLeft:10,  marginRight:10}} name="radio-button-on-outline" size={20} color="red" />
                                                                                    <Text style={{textAlign:'center', color:'red'}}>Debe contener al menos 8 caracteres</Text>
                                                                        </View>)}
                                            </View>                                 
                                         {/* <SeguridadFigmaReusableComponent navigation = { navigation }></SeguridadFigmaReusableComponent> */}

                                          <HeaderTitleFigma title="Confirma la nueva contraseña" 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={0}
                                                                            type='small'
                                                                            isAlertaAsterisco
                                                                            ></HeaderTitleFigma>
                                             <View style={{ marginBottom:30, 
                                                            flexDirection:'column',
                                                            marginHorizontal:20}}> 
                                                    <View style={{ flexDirection:'row'}}>
                                                                        <View style={{flex:9, marginBottom:0}}>
                                                                                <TextInput 
                                                                                        placeholder="******"
                                                                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                                                                        underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                                        secureTextEntry={secureText_II}
                                                                                        maxLength={16}
                                                                                        style={[ 
                                                                                            stylesFigma.inputField,
                                                                                            ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                                                        ]}
                                                                                        selectionColor="white"
                                                                                        onChangeText={ (value) => {
                                                                                            onInputChange_II(value);
                                                                                            onSecurityInputChange_II( value );
                                                                                        } }
                                                                                        value={ inputValue_II }
                                                                                        onSubmitEditing={ onSubmit }
                                                                                        autoCapitalize="none"
                                                                                        autoCorrect={ false }
                                                                                        />
                                                                        </View>
                                                                        <View style={{flex:1, marginLeft:20}}>
                                                                            <TouchableOpacity onPress={toggleSecureText_II}>
                                                                                <Ionicons name={secureText_II ? 'eye' : 'eye-off'} size={24} color="black" />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                    </View>
                                                    { showWarnings_II && (<View style={{flexDirection:'row', marginTop:10}}>
                                                                                    <Ionicons style={{ marginLeft:10,  marginRight:10}} name="radio-button-on-outline" size={20} color="red" />
                                                                                    <Text style={{textAlign:'center', color:'red'}}>Debe contener al menos 8 caracteres</Text>
                                                                        </View>)}
                                            </View> 
                                         {/* <SeguridadFigmaReusableComponent navigation = { navigation }></SeguridadFigmaReusableComponent> */}

                                         <View style={{flex:1}}></View>
                                          <View style={ { alignItems:'center', marginTop:0, marginBottom:30} }>
                                                <TouchableOpacity
                                                    activeOpacity={ 0.8 }
                                                    style={  [{...stylesFigma.button} ]}
                                                    onPress={ onSubmit }
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
