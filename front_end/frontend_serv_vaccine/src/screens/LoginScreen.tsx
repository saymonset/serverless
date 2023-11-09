import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Platform, KeyboardAvoidingView, Keyboard, Alert, TouchableOpacity } from 'react-native';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
/**-----------store login------------- */
import { loginThunks, removeErrorThunks } from '../store/slices/login'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {

    const { signIn, isSendCode } = useContext( AuthContext );

    const { email, password, onChange } = useForm({
       email: '',
       password: '' 
    });

    const { isLoading, message  } = useSelector( state => state.loginStore)
    const dispatch = useDispatch();

    const   onClearError = async () => {
          removeErrorThunks(dispatch)
    } 

    useEffect(() => {
        
        if(  message.length === 0 ) return;
        Alert.alert( message, '',[{
            text: 'Ok',
            onPress:  onClearError
        }]);
        
    }, [ message ])

    
    const   onLogin = async () => {
        Keyboard.dismiss();
        await dispatch(loginThunks( email, password));
    }

    if ( isLoading ) return <LoadingScreen /> 

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

                    <Text style={ loginStyles.title }>Login</Text>

                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput 
                        placeholder="Ingrese su email:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'email') }
                        value={ email }
                        onSubmitEditing={ onLogin }


                        autoCapitalize="none"
                        autoCorrect={ false }
                    />


                    <Text style={ loginStyles.label }>Password:</Text>
                    <TextInput 
                        placeholder="******"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'password') }
                        value={ password }
                        onSubmitEditing={ onLogin }

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />


                    {/* Boton login */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onLogin }
                        >
                            <Text style={ loginStyles.buttonText } >Login</Text>
                        </TouchableOpacity>
                    </View>

                  
                    {/* Crear una nueva cuenta */}
                    <View style={ loginStyles.newUserContainer  }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            onPress={ () => navigation.replace('SendSmsScreen') }
                        >
                            <Text style={ loginStyles.buttonText }>{!isSendCode?'New Account':'Check Code'} </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </KeyboardAvoidingView>
        </>
    )
}
