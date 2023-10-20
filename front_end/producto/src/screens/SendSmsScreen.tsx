import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<any, any> {}

export const SendSmsScreen = ({ navigation }: Props) => {
    

    const { sendSms, resetSendSms, checkCode, token,  errorMessage, removeError, isSendCode, phone:phoneSend , status} = useContext( AuthContext );

    const { phone, code0, onChange } = useForm({
       phone: '',
       code0: '' 
    });

        {/* Simbolo wait esperando */}
    // if ( status === 'checking' ) return <LoadingScreen />

  {/*  Si ya en el redux nos trae el token actualizado, es porque puede crear un usuario */}
    useEffect(() => {
        // Ejecutar la navegación automáticamente al cargar el componente
        navigation.replace('UserAdd');
      }, [token]);

      {/* Solo para sacar mensajes de error por pantalla */}
    useEffect(() => {
        if( errorMessage.length === 0 ) return;

        Alert.alert( 'Phone incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])

    const onSendSms= () => {
        Keyboard.dismiss();
        sendSms({ phone });
    }

    const onResetSendSms= () => {
        Keyboard.dismiss();
        resetSendSms();
    }

    const onCheckCode= () => {
        Keyboard.dismiss();
        let phone = phoneSend ;
        checkCode({phone, code:code0})
    }

    return (
        <>
            {/* Background */}
            <Background />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >

               


                <View style={ loginStyles.formContainer }>                
                    {/* Keyboard avoid view */}
                    <WhiteLogo />

                                    <Text style={ loginStyles.title }>Send SMS</Text>
                                                        { !isSendCode  && (
                                                        <> 
                                        <Text style={ loginStyles.label }>Phone:</Text>
                                        <TextInput 
                                            placeholder="+112223333344"
                                            placeholderTextColor="rgba(255,255,255,0.4)"
                                            underlineColorAndroid="white"
                                            style={[ 
                                                loginStyles.inputField,
                                                ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                            ]}
                                            selectionColor="white"

                                            onChangeText={ (value) => onChange(value, 'phone') }
                                            value={ phone }
                                            onSubmitEditing={ onSendSms }


                                            autoCapitalize="none"
                                            autoCorrect={ false }
                                        />
                                    </>)
                                    }

                                    { isSendCode  && (
                                        <>
                                            <Text style={ loginStyles.label }>code:</Text>
                                            <TextInput 
                                                placeholderTextColor="rgba(255,255,255,0.4)"
                                                underlineColorAndroid="white"
                                                style={[ 
                                                    loginStyles.inputField,
                                                    ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                ]}
                                                selectionColor="white"

                                                onChangeText={ (value) => onChange(value, 'code0') }
                                                value={ code0 }
                                                onSubmitEditing={ onCheckCode }

                                                autoCapitalize="none"
                                                autoCorrect={ false }
                                            />
                                        </>)
                                    }
                                    



                                    { isSendCode  && (
                                    <>
                                        {/* Boton Check Code */}
                                        <View style={ loginStyles.buttonContainer }>
                                            <TouchableOpacity
                                                activeOpacity={ 0.8 }
                                                style={ loginStyles.button }
                                                onPress={ onCheckCode }
                                            >
                                                <Text style={ loginStyles.buttonText } >Check Code</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>)
                                    }
                                    
                                    { !isSendCode  && (
                                    <> 
                                    {/* Boton Send Msg */}
                                    <View style={ loginStyles.buttonContainer }>
                                        <TouchableOpacity
                                            activeOpacity={ 0.8 }
                                            style={ loginStyles.button }
                                            onPress={ onSendSms }
                                        >
                                            <Text style={ loginStyles.buttonText } >Send SMS</Text>
                                        </TouchableOpacity>
                                    </View>
                                    </>)
                                    }

                                        { isSendCode  && (
                                                            <> 
                                                {/* Reset code*/}
                                                <View style={ loginStyles.newUserContainer  }>
                                                    <TouchableOpacity
                                                        activeOpacity={ 0.8 }
                                                        onPress={  onResetSendSms}
                                                    >
                                                        <Text style={ loginStyles.buttonText }>Reset</Text>
                                                    </TouchableOpacity>

                                                </View>
                                        </>)
                                        }
                               
                            
                     

                    


                </View>
                
            </KeyboardAvoidingView>
        </>
    )
}
