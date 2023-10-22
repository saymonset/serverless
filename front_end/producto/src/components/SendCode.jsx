import React, {  useState, useContext} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { loginStyles } from '../theme/loginTheme';

export const  SendCode = () => {

  const {  resetSendSms, checkCode, phone  } = useContext( AuthContext );
  const [ inputValue, setInputValue ] = useState('');

  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onSubmit = ( event ) => {
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;
      setInputValue('');
      onCheckCode( inputValue.trim() );
  }

  const onResetSendSms= () => {
    Keyboard.dismiss();
    resetSendSms();
}


const onCheckCode= (code) => {
  Keyboard.dismiss();
  checkCode({phone, code})
}


  return (
      <>
             <Text style={ loginStyles.label }>code:</Text>
            <TextInput 
                                            placeholder="Code"
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
                {/* Boton Check Code */}
                <View style={ loginStyles.buttonContainer }>
                                            <TouchableOpacity
                                                activeOpacity={ 0.8 }
                                                style={ loginStyles.button }
                                                onPress={ onSubmit }
                                            >
                                                <Text style={ loginStyles.buttonText } >Check Code</Text>
                                            </TouchableOpacity>
                                        </View>
                 {/* Reset code*/}
                 <View style={ loginStyles.newUserContainer  }>
                                                    <TouchableOpacity
                                                        activeOpacity={ 0.8 }
                                                        onPress={  onResetSendSms}
                                                    >
                                                        <Text style={ loginStyles.buttonText }>Reset</Text>
                                                    </TouchableOpacity>

                                                </View>
    </>
  )
}
