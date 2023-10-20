import React, { useContext, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'


import { AuthContext } from '../context/AuthContext';
import { loginStyles } from '../theme/loginTheme'

import { WhiteLogo } from '../components/WhiteLogo'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack';


interface Props extends StackScreenProps<any,any>{}


export const UserAdd = ( { navigation }: Props ) => {

    const { signUp, errorMessage, removeError } = useContext( AuthContext );

    const { email, password, name, lastname, ci, state, city, birth, gender_id, status, onChange } = useForm({
        name: '',
        lastname:'',
        password: '' ,
        ci:'',
        email: '',
        state:'',
        city:'',
        birth:'',
        gender_id:'',
        status: true

       
     });

     useEffect(() => {
        if( errorMessage.length === 0 ) return;

        Alert.alert( 'Registro incorrecto', errorMessage,[{
            text: 'Ok',
            onPress: removeError
        }]);

    }, [ errorMessage ])
 
     const onRegister = () => {
         console.log({email, password, name, lastname, ci, state, city, birth, gender_id, status});
         Keyboard.dismiss();
        //  signUp({
        //      nombre: name,
        //      correo: email,
        //      password
        //  });
     }


    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: '#5856D6' }}
                behavior={ ( Platform.OS === 'ios') ? 'padding': 'height' }
            >


                <View style={ loginStyles.formContainer }>                
                    {/* Keyboard avoid view */}
                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Add User</Text>

                    <Text style={ loginStyles.label }>Name:</Text>
                    <TextInput 
                        placeholder="Enter your name:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'name') }
                        value={ name }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Last Name:</Text>
                    <TextInput 
                        placeholder="Enter your lastname:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'lastname') }
                        value={ lastname }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
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
                        onSubmitEditing={ onRegister }

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Ci:</Text>
                    <TextInput 
                        placeholder="Enter your Ci:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'ci') }
                        value={ ci }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />


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
                        onSubmitEditing={ onRegister }


                        autoCapitalize="none"
                        autoCorrect={ false }
                    />


                    <Text style={ loginStyles.label }>City:</Text>
                    <TextInput 
                        placeholder="Enter your city where you live:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'city') }
                        value={ city }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />
               
                    <Text style={ loginStyles.label }>State:</Text>
                    <TextInput 
                        placeholder="Enter your state where you live:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'state') }
                        value={ state }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Birth:</Text>
                    <TextInput 
                        placeholder="Enter your birth:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'birth') }
                        value={ birth }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />

                    <Text style={ loginStyles.label }>Gender:</Text>
                    <TextInput 
                        placeholder="Enter your gender:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'gender_id') }
                        value={ gender_id }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />
                    


                    {/* Boton login */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onRegister }
                        >
                            <Text style={ loginStyles.buttonText } >Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear una nueva cuenta */}
                    <TouchableOpacity
                        onPress={ () => navigation.replace('LoginScreen') }
                        activeOpacity={ 0.8 }
                        style={ loginStyles.buttonReturn }
                    >
                        <Text style={ loginStyles.buttonText  }>Login</Text>
                    </TouchableOpacity>

                </View>
                
            </KeyboardAvoidingView>
        </>
    )
}
