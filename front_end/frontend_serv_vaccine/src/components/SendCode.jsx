import React, {  useState, useContext, useEffect} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { loginStyles } from '../theme/loginTheme';
import {  resetSendSmsThunks, removeErrorSmsThunks, checkCodeThunks } from '../store/slices/sendSms/index' 
import {   store } from '../store' 
import { LoadingScreen } from '../screens/LoadingScreen';

export const  SendCode = ({ navigation }) => {

  const [ inputValue, setInputValue ] = useState('');

  const { isLoading, message, phone, token } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();

  
  const   onClearError = async() => {
     await removeErrorSmsThunks(dispatch)
} 

    {/* Solo para sacar mensajes de error por pantalla */}
    useEffect(() => {
        if( message.length === 0 ) return;

        Alert.alert(message,'',[{
            text: 'Ok',
            onPress: onClearError
        }]);
    
      
       

        onClearError();
       // navigation.replace('SendSmsScreen');

    }, [ message ])

  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onSubmit = async ( event ) => {
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;
      await dispatch(checkCodeThunks( phone, inputValue.trim()));
      setInputValue('');
  }

  const onResetSendSms= () => {
    Keyboard.dismiss();
    resetSendSmsThunks(dispatch);
}

   if ( isLoading ) return <LoadingScreen /> 

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
                                                        <Text style={ loginStyles.buttonText }>Reset {message}</Text>
                                                    </TouchableOpacity>

                                                </View>
    </>
  )
}
