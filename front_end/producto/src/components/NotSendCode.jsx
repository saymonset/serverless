import React, {  useState} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity } from 'react-native';
import { loginStyles } from '../theme/loginTheme';

export const  NotSendCode = ({ onNewPhone }) => {
  const [ inputValue, setInputValue ] = useState('');

  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onSubmit = ( event ) => {
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;
      // setCategories( categories => [ inputValue, ...categories ]);
      setInputValue('');
      onNewPhone( inputValue.trim() );
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
                                        <TouchableOpacity
                                            activeOpacity={ 0.8 }
                                            style={ loginStyles.button }
                                            onPress={ onSubmit }
                                        >
                                            <Text style={ loginStyles.buttonText } >Send SMS</Text>
                                        </TouchableOpacity>
                                    </View>
    </>
  )
}
