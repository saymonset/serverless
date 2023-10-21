import React, {  useState, useContext} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { loginStyles } from '../theme/loginTheme';

export const  SendCode = ({ onNewCode }) => {

  const {  resetSendSms } = useContext( AuthContext );
  const [ inputValue, setInputValue ] = useState('');

  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onSubmit = ( event ) => {
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;
      setInputValue('');
      onNewCode( inputValue.trim() );
  }

  const onResetSendSms= () => {
    Keyboard.dismiss();
    resetSendSms();
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
