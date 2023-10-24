import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from './LoadingScreen';
import { SendPhone } from '../components/SendPhone';
import { SendCode } from '../components/SendCode';
 
 

interface Props extends StackScreenProps<any, any> {}

export const SendSmsScreen = ({ navigation }: Props) => {

    const {  token,  errorMessage, removeError, isSendCode, status} = useContext( AuthContext );

        {/* Simbolo wait esperando */}
    if ( status === 'checking' ) return <LoadingScreen />

  {/*  Si ya en el redux nos trae el token actualizado, es porque puede crear un usuario */}
    useEffect(() => {
        // Ejecutar la navegación automáticamente al cargar el componente
        if (token === '' || token === null) return;
        navigation.replace('UserPartTotal');
      }, [token]);

      {/* Solo para sacar mensajes de error por pantalla */}
    useEffect(() => {
        if( errorMessage && errorMessage.length === 0 ) return;

        Alert.alert( 'Phone incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])

  



    

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
                                                             <SendPhone navigation = { navigation }></SendPhone>
                                                        </>)
                                                        }

                                                        { isSendCode  && (
                                                            <>
                                                            <SendCode></SendCode>
                                                            </>)
                                                        }
                                     

                </View>
                
            </KeyboardAvoidingView>
        </>
    )
}
