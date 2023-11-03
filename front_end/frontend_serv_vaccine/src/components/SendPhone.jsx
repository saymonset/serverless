import React, {  useState, useContext} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { loginStyles } from '../theme/loginTheme';
import { StackScreenProps } from '@react-navigation/stack';



interface Props extends StackScreenProps<any, any> {}


export const  SendPhone = ({ navigation }) => {

    console.log({navigation})

    const { sendSms, beforeCheckCode } = useContext( AuthContext );  
  const [ inputValue, setInputValue ] = useState('');

  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onSubmit = ( event ) => {
      Keyboard.dismiss();
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;
      beforeCheckCode()
      sendSms({phone:inputValue.trim()});
      setInputValue('');
  }

  const onLogin = ( event ) => {
    if (navigation) {
        
        navigation.replace('LoginScreen');
      }
   // Keyboard.dismiss();
   // event.preventDefault();
   //
}
 
  return (
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

                                            onChangeText={ (value) => onInputChange(value) }
                                            value={ inputValue }
                                            onSubmitEditing={ onSubmit }


                                            autoCapitalize="none"
                                            autoCorrect={ false }
                                            />
              {/* Boton Send Msg */}
                      
                             <View style={ loginStyles.buttonContainer }>
                                    <View style={ loginStyles.severalContainer}>
                                            <TouchableOpacity
                                                    activeOpacity={ 0.8 }
                                                    style={ loginStyles.button }
                                                    onPress={ onLogin }
                                                >
                                                    <Text style={ loginStyles.buttonText } >Back</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    activeOpacity={ 0.8 }
                                                    style={ loginStyles.button }
                                                    onPress={ onSubmit }
                                                >
                                                    <Text style={ loginStyles.buttonText } >Send SMS</Text>
                                                </TouchableOpacity>
                                     </View>
                              </View>
    </>
  )
}
