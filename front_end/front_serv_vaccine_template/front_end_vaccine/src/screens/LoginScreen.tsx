import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Background } from '../components/Background';
import { HeaderTitle } from '../components/HeaderTitle';
import { WhiteLogo } from '../components/WhiteLogo';
import { useForm } from '../hooks/useForm';
import { styles } from '../theme/appTheme';
import { loginStyles } from '../theme/loginTheme';

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {


  const { email, password, onChange } = useForm({
     email: '',
     password: '' 
  });


  const onLogin = async () => {
    Keyboard.dismiss();
    console.log( {email, password });
}
 
  return (
 
    <>
          {/* Background */} 
           <Background></Background>

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
                                      onPress={ () => navigation.replace('RegisterScreen') }
                                  >
                                      <Text style={ [loginStyles.buttonText, loginStyles.buttonTextNewAaccount ] }>New Account</Text>
                                  </TouchableOpacity>
                              </View>
                </View>  
            </KeyboardAvoidingView>   
       
    </>
  )
}
