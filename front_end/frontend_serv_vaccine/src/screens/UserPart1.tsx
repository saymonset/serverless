import React from 'react'
import { View, Text, TextInput, Platform } from 'react-native';
import { loginStyles } from '../theme/loginTheme';

export const UserPart1 = ({ name, onRegister, onChange }) => {
  return (
    <View style={ loginStyles.formContainer }>         
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
  )
}
