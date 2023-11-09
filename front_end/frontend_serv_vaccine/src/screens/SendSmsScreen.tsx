import React, { useContext } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


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

   // const {  token,  errorMessage, removeError, isSendCode, status} = useContext( AuthContext );

   const { isSendCode  } = useSelector( (state: store ) => state.sendSmsStore);
  
    

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
