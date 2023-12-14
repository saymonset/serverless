import React, { useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { loginStyles } from '../theme/loginTheme';
import { WhiteLogo } from './WhiteLogo';
import { styles } from '../theme/registerTheme';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { registerThunks } from '../store/slices/register';
import { UseGenderComponent } from './GenderComponent';
import { CustomSwitch } from './CustomSwitch';
import { CalendarComponent } from './CalendarComponent';

interface Props1  {
    onLogin: () => void;
    onRegisterScreen: () => void;
}

export const RegisterComponent = ( { onLogin, onRegisterScreen }: Props1) => {



  const [selected, setSelected] = React.useState("");
  const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
  const onSelectTrigger = (value:string) => {
      console.log(`Disparado desde el padre: ${value}`);
      setSelectedGeneroId(value);
  }
  const { token, phone } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();
  const { name,  lastname,  password, ci, email, state, city, birth, gender_id, status, onChange } = useForm({
      name:'', lastname:'', password:'', ci:'', email:'', state:'', city:'', birth:'', gender_id:'', status:true
   });
 



   
  const onRegister = async() => {
    Keyboard.dismiss();
    let obj = {
       name,
       lastname,
       password,
       ci,
       email,
       state,
       city,
       birth,
       gender_id:selectedGeneroId,
       status,
       token,
       phone
     };


        let register: Register = { ...obj  };

        console.log({phone})
        await dispatch(registerThunks( register));
       
         {/** Nos vamos a la pantalla principal */}
         onRegisterScreen();
        }

        const onDateSelection = (date:Date)=>{
            onChange(date, 'birth')
        }


    

  return (
    <>
      <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior={ ( Platform.OS === 'ios') ? 'padding': 'height' }
            >

                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={ loginStyles.formContainer }>                

                            <Text style={ loginStyles.title }>Registro</Text>
                            <SafeAreaView 
                            style={[styles.container]}>
                                    <View style={[styles.column]}>
                                        <View>
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
                                        </View> 
                                        <View>
                                            <Text style={ loginStyles.label }>Lastname:</Text>
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
                                        </View> 
                                        <View>
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
                                        </View>
                                        <View>
                                                <Text style={ loginStyles.label }>Email:</Text>
                                                <TextInput 
                                                    placeholder="Enter your email:"
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
                                        </View>
                                    <View>
                                                <Text style={ loginStyles.label }>Birthday:</Text>
                                                <CalendarComponent onDateSelection= {(value) => onDateSelection(value)}/>
                                                {/* <TextInput 
                                                    placeholder="Enter your birthday:"
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
                                                /> */}
                                    </View>
                                    </View>
                                    <View style={[styles.column]}>
                                        <View>
                                                    <Text style={ loginStyles.label }>CI:</Text>
                                                    <TextInput 
                                                        placeholder="Enter your CI:"
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
                                        </View>  
                                        <View>
                                                    <Text style={ loginStyles.label }>Status:</Text>
                                                    <CustomSwitch isOn= { true } onChange={ ( status ) =>  onChange(status, 'status') }></CustomSwitch>
                                        </View>  
                                        <View>
                                                    <Text style={ loginStyles.label }>Gender:</Text>
                                                    {/* <UseGenderComponent onPress={ onSelectTrigger }/>  */}
                                        </View>  
                                        <View>
                                                    <Text style={ loginStyles.label }>City:</Text>
                                                    <TextInput 
                                                        placeholder="Enter your City:"
                                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                                        underlineColorAndroid="white"
                                                        style={[ 
                                                            loginStyles.inputField,
                                                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                                                        ]}
                                                        selectionColor="white"

                                                        onChangeText={ (value) => onChange(value, 'city') }
                                                        value={city }
                                                        onSubmitEditing={ onRegister }

                                                        autoCapitalize="words"
                                                        autoCorrect={ false }
                                                    />
                                        </View>  
                                    </View>
                    </SafeAreaView>
                            
                            </View>
                    </TouchableWithoutFeedback>
              </ScrollView>
      </KeyboardAvoidingView>
      {/** Botones */}
      <View style={{ flexDirection: 'row',justifyContent:'space-between', marginBottom:0, marginHorizontal:1, bottom:5 }}>

                 <TouchableOpacity onPress={onLogin} style={{ marginTop: 0 }}>
                      <Ionicons name="close" size={40} color="red" />
                 </TouchableOpacity>

                 <TouchableOpacity onPress= { onRegister} style={{ marginTop: 0 }}>
                     <Ionicons name="save" size={40} color="green" />
                 </TouchableOpacity>
               
      </View>
    </>  
  )
}
