import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
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
import { ModalMessageComponent } from '../components/ModalMessageComponent';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { loginCiThunks, removeErrorThunks } from '../store/slices/login/loginThunks'
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from './LoadingScreen';


interface Props extends StackScreenProps<any, any> {}


export const LoginFigmaScreen = ({ navigation }: Props) => {

  const {  message, status, isLoading  } = useSelector( (state: store ) => state.loginStore);
  const {  getGeneroRaltionSchipLoads } = useContext(AuthContext)

  const dispatch = useDispatch();

  const [secureText, setSecureText] = useState(true);
  const [showWarnings, setShowWarnings] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ password, setPassword ] = useState('');


  const { ci, onChange } = useForm({
          ci:'' 
 });


  const onInputChange = (value:any) => {
    setPassword( value );
}


const toggleSecureText = () => {
  setSecureText(!secureText);
}

 
const onSecurityInputChange = (value) => {
  if (value.length > 8) {
      setShowWarnings(false);
    }
}
    
    const cerrarModal = () => {
              setIsVisible(false);
              //Borramos mensajes del thrunk
              onClearError();
           
              // Carga los generos y relationShips en memoria encontrados en bd y llevados al contexto para tenerlos  ya cargados
              if (status==='authenticated'){
                   getGeneroRaltionSchipLoads();
              }
    }

    const abrirModal = () => {
      setIsVisible(true);
    }

    const registrate = () => {
       navigation.replace("WelcomeScreen")
    }

    const onLogin = async ( event ) => {
      event.preventDefault();
      Keyboard.dismiss();
         
         if( password.trim().length <= 7){
            setShowWarnings(true);
            return;
          }
          await dispatch(loginCiThunks( ci, password));
          console.log('Hola')
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
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
                
              <View style={ stylesFigma.formContainer }> 
                            <View style={{flex:1}}>
                                        <HeaderTitleFigma title="Iniciar sesión" 
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
                                                                    onSubmitEditing={ onLogin }

                                                                    autoCapitalize="words"
                                                                    autoCorrect={ false }
                                                                />
                                          </View>
                                          <HeaderTitleFigma title="Contraseña" 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            marginBottom={0}
                                                                            type='small'
                                                                            isAlertaAsterisco
                                                                            ></HeaderTitleFigma>
                                         
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
                                                                                  ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                                                                                  {marginHorizontal:20}
                                                                              ]}
                                                                              selectionColor="white"
                                                                              onChangeText={ (value) => {
                                                                                  onInputChange(value);
                                                                                  onSecurityInputChange( value );
                                                                              } }
                                                                              value={ password }
                                                                              onSubmitEditing={ onLogin }
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
                                    
                                          <View style={ { alignItems:'center', marginTop:50, marginBottom:30} }>
                                                <TouchableOpacity
                                                    activeOpacity={ 0.8 }
                                                    style={  [{...stylesFigma.button} ]}
                                                    onPress= { onLogin } 
                                                >
                                                    <Text style={ stylesFigma.buttonText } >Entrar</Text>
                                                </TouchableOpacity>
                                           </View> 
                                            <View style={ {
                                                     marginTop:0,
                                                     paddingBottom:30,
                                                     justifyContent:'flex-start',
                                                     alignItems:'center',
                                                     flex:1}}> 
                                                    <View style ={{flex:1}}>
                                                    <TouchableOpacity onPress={() => navigation.replace("PasswordRecoveryScreen1")}>
                                                               <HeaderTitleFigma title="¿Olvidates tu contraseña?" 
                                                                                                          marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                                                          marginBottom={(Platform.OS === 'ios') ? 20: 20}
                                                                                                          stylesFigma={stylesFigma}
                                                                                                          type='small'
                                                                                                          color = 'skyblue'
                                                                                                        ></HeaderTitleFigma>
                                                    </TouchableOpacity>                                                    
                                                                   <View style={{ marginBottom:0, borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 2 }} /> 
                                                    </View>
                                                    
                                                    {   ( isLoading ) && <LoadingScreen /> }    

                                                    
                                                        <View style={{marginTop:0}}>
                                                            <TouchableOpacity onPress={() => registrate()}>
                                                              <View style={{flexDirection:'row'}}>
                                                                    <Text style={{ color: 'black' }}>¿No tienes cuenta aun?
                                                                            
                                                                    </Text>
                                                                    <Text style={{ color: 'skyblue',paddingLeft:10 }}>Registrate</Text>
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
