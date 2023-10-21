import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from './LoadingScreen';
import { NotSendCode } from '../components/NotSendCode';
import { SendCode } from '../components/SendCode';
 
 

interface Props extends StackScreenProps<any, any> {}

export const SendSmsScreen = ({ navigation }: Props) => {
    

    const { sendSms, resetSendSms, checkCode, token,  errorMessage, removeError, isSendCode, phone:phoneSend , status} = useContext( AuthContext );

    const { phone, code0, onChange } = useForm({
       phone: '',
       code0: '' 
    });

        {/* Simbolo wait esperando */}
    if ( status === 'checking' ) return <LoadingScreen />

  {/*  Si ya en el redux nos trae el token actualizado, es porque puede crear un usuario */}
    useEffect(() => {
        // Ejecutar la navegación automáticamente al cargar el componente
        navigation.replace('UserPartTotal');
      }, [token]);

      {/* Solo para sacar mensajes de error por pantalla */}
    useEffect(() => {
        if( errorMessage.length === 0 ) return;

        Alert.alert( 'Phone incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])

    const onSendSms= (phone:string) => {
        Keyboard.dismiss();
        console.log(phone)
        sendSms({ phone });
    }



    const onCheckCode= (code:string) => {
        Keyboard.dismiss();
        let phone = phoneSend ;
        console.log({phone, code})
        checkCode({phone, code})
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

                    {/* <AddCategory 
                onNewCategory={ (value) => onAddCategory(value) }
            /> */}

                                    <Text style={ loginStyles.title }>Send SMS</Text>
                                                        { !isSendCode  && (
                                                        <> 
                                    <NotSendCode onNewPhone={ (value:string) => onSendSms(value) }></NotSendCode>
                                    </>)
                                    }

                                    { isSendCode  && (
                                        <>
                                          <SendCode onNewCode={ (value:string) => onCheckCode(value) }></SendCode>
                                        </>)
                                    }
                                    



                                 
                                    
                                   

                                       
                               
                            
                     

                    


                </View>
                
            </KeyboardAvoidingView>
        </>
    )
}
