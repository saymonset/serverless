import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from '../hooks/useForm';
import { WhiteLogo } from '../components/WhiteLogo';
import { BackgroundSendPhoneFigma } from '../components/BackgroundSendPhoneFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import {  passwordRecoveryThunks, removeErrorSmsThunks, sendSmsThunks } from '../store/slices/sendSms/index' ;
import { ModalMessageComponent } from '../components/ModalMessageComponent';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from './LoadingScreen';


interface Props extends StackScreenProps<any, any> {}


export const PasswordRecoveryScreen1 = ({ navigation }: Props) => {

  const {  message, isSendCode, isLoading, resp } = useSelector( (state: store ) => state.sendSmsStore);

  const dispatch = useDispatch();

  const [secureText, setSecureText] = useState(true);
  const [showWarnings, setShowWarnings] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ tlf, setTlf ] = useState('');


  const {  ci, onChange } = useForm({
          ci:'' 
 });

 const tlfRef = useRef(null);
 const [ codValue, setCodValue ] = useState('');

 const onCodInputChange = (value) => {
  setCodValue( value );
  if (value.length === 3) {
        tlfRef?.current?.focus(); // Salta al campo tlf
    }
}

  const onInputChange = (value:any) => {
    setTlf( value );
}


const toggleSecureText = () => {
  setSecureText(!secureText);
}

 
const onSecurityInputChange = (value) => {
  if (value.length > 8) {
      setShowWarnings(false);
    }
}
    
    const cerrarModal = async() => {
              setIsVisible(false);
              //Borramos mensajes del thrunk
              onClearError();
              if (isSendCode){
                //Limpoiamos el phone
                   setTlf('');
                   setCodValue( '' );
                   //Limpiamos cedula
                   onChange('','ci');
                   navigation.replace("SendCodeFigmaRecoveryScreen2")
              }
    }

    const abrirModal = () => {
      setIsVisible(true);
    }

    const registrate = () => {
       navigation.replace("WelcomeScreen")
    }


    const onSubmit = async( event ) => {
          Keyboard.dismiss();
          event.preventDefault();
          if( codValue.trim().length <= 1) return;
          if( tlf.trim().length <= 1) return;
          let phone = codValue.trim()+tlf.trim()
          await dispatch(passwordRecoveryThunks( phone, ci ));
     }


  const   onClearError = async () => {
    await removeErrorSmsThunks(dispatch);
    //Borra mensajees de registerScreen
    await removeErrorSmsThunks(dispatch)
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
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
                
              <View style={ stylesFigma.formContainer }> 
                            <View style={{flex:1}}>
                                        <HeaderTitleFigma title="Contraseña olvidada" 
                                                                            marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={15}
                                                                            ></HeaderTitleFigma>
                                                                            
                                        <HeaderTitleFigma title="Cedula de identidad" 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={0}
                                                                            type='small'
                                                                            isAlertaAsterisco
                                                                            ></HeaderTitleFigma>
                                          <View style = {{ marginVertical:10,}}>
                                                                <TextInput 
                                                                    placeholder="V- 12345678"
                                                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                                                    underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                    style={[ 
                                                                        comunStylesFigma.inputField,
                                                                        ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS,
                                                                        {marginHorizontal:20}
                                                                    ]}
                                                                    selectionColor="white"

                                                                    onChangeText={ (value) => onChange(value, 'ci') }
                                                                    value={ ci }
                                                                    onSubmitEditing={ onSubmit }

                                                                    autoCapitalize="words"
                                                                    autoCorrect={ false }
                                                                />
                                          </View>
                                          <HeaderTitleFigma title="Número de telefono." 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={0}
                                                                            type='small'
                                                                            isAlertaAsterisco
                                                                            ></HeaderTitleFigma>
                                         
                                         <View style={{flex:1, marginBottom:50}}>
                                                       <View  style={{flex:1, flexDirection:'row'}}>
                                                                <View style={{flex:1,  flexWrap:'wrap', left:30, marginRight:20}}>
                                                                        <TextInput 
                                                                                                    placeholder="+00"
                                                                                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                                                                                    underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                                                    style={[ 
                                                                                                        stylesFigma.inputField,
                                                                                                        ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                                                                    ]}
                                                                                                    onChangeText={ (value) => onCodInputChange(value) }
                                                                                                    value={ codValue }
                                                                                                    onSubmitEditing={ onSubmit }
                                                                                                    autoCapitalize="none"
                                                                                                    autoCorrect={ false }
                                                                                                    maxLength={3} // Limita la entrada a tres caracteres
                                                                                                    />
                                                                </View>
                                                                <View style={{flex:2, right: ( Platform.OS === 'ios' )?60:90, marginBottom:0}}>
                                                                        <TextInput 
                                                                                                    ref={tlfRef} // Referencia al campo tlf
                                                                                                    placeholder="Número de télefono"
                                                                                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                                                                                    underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                                                    style={[ 
                                                                                                        stylesFigma.inputField,
                                                                                                        ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                                                                    ]}
                                                                                                    selectionColor="rgba(0,0,0,0.4)"
                                                                                                    onChangeText={ (value) => onInputChange(value) }
                                                                                                    value={ tlf }
                                                                                                    onSubmitEditing={  onSubmit }
                                                                                                    autoCapitalize="none"
                                                                                                    autoCorrect={ false }
                                                                                                    maxLength={15} // Limita la entrada a tres caracteres
                                                                                                    />
                                                                </View>
                                                       </View>

                                                      {/*  Loading */}
                                                       { ( isLoading ) && <LoadingScreen /> }

                                                      {/* Boton Send Msg */}
                                                      <View style={ {...stylesFigma.buttonContainer,
                                                              alignItems:'center',
                                                              justifyContent:'center',
                                                              marginTop:(Platform.OS === 'ios') ? 0: 0, 
                                                              marginBottom:(Platform.OS === 'ios') ? 0: 0} }>
                                                                <TouchableOpacity
                                                                    activeOpacity={ 0.8 }
                                                                    style={ {...stylesFigma.button,
                                                                                width:250,
                                                                                
                                                                          } }
                                                                    onPress={ onSubmit }
                                                                >
                                                                  <Text style={ stylesFigma.buttonText } >Recuperar mi contraseña</Text>
                                                                </TouchableOpacity>
                                                      </View>  
                                         </View>
                                             
                                          
                                            <View style={ {
                                                     marginTop:0,
                                                     paddingBottom:30,
                                                     justifyContent:'flex-start',
                                                     alignItems:'center',
                                                     flex:1}}> 
                                                 
                                                    <View style ={{flex:1}}>
                                                 
                                                    </View>
                                                        <View style={{marginTop:0}}>
                                                            <TouchableOpacity onPress={() => registrate()}>
                                                              <View style={{flexDirection:'row'}}>
                                                                    <Text style={{ color: 'black' }}>¿Necesitas ayuda?
                                                                            
                                                                    </Text>
                                                                    <Text style={{ color: 'skyblue',paddingLeft:10 }}>Contactanos</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
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
 

