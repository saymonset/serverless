import React, { useEffect } from 'react';
import { Text, View, Platform, KeyboardAvoidingView, Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { SendPhone } from '../components/SendPhone';
import { SendCode } from '../components/SendCode';
import {  removeErrorSmsThunks } from '../store/slices/sendSms/index' ;
import {  removeErrorThunks } from '../store/slices/register/index';

 




interface Props extends StackScreenProps<any, any> {}

export const SendSmsScreen = ({ navigation }: Props) => {

   const {  message, isSendCode , token } = useSelector( (state: store ) => state.sendSmsStore);
   const dispatch = useDispatch();

   const   onClearError = async () => {
    await removeErrorSmsThunks(dispatch);
    //Borra mensajees de registerScreen
    await removeErrorThunks(dispatch)
   } 
    
     {/* Solo para sacar mensajes de error por pantalla */}
    useEffect(() => {
        if( message.length === 0 ) return;
                Alert.alert(message,'',[{
                    text: 'Ok',
                    onPress: onClearError
                }]);
        onClearError();

        if (isSendCode){
            navigation.replace('SendSmsScreen');
        }

        if (token){
            navigation.replace('RegisterScreen');
        }
    }, [ message ])

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
                                                            <SendCode navigation = { navigation }></SendCode>
                                                            </>)
                                                        }
                                     

                </View>
                
            </KeyboardAvoidingView>
        </>
    )
}
