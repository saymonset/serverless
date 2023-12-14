import React, {  useState, useContext, useEffect} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard , Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginStyles } from '../theme/loginTheme';
import { StackScreenProps } from '@react-navigation/stack';
import {   store } from '../store' 
import {  sendSmsThunks } from '../store/slices/sendSms/index' 

import { LoadingScreen } from '../screens/LoadingScreen';


interface Props extends StackScreenProps<any, any> {}


export const  SendPhone = ({ navigation }) => {

   
  const [ inputValue, setInputValue ] = useState('');



  const { isLoading } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();





  
  
  
  
  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onSubmit = async( event ) => {
      Keyboard.dismiss();
      event.preventDefault();
      if( inputValue.trim().length <= 1) return;

      await dispatch(sendSmsThunks( inputValue.trim() ));
      setInputValue('');
  }

  const onLogin = ( event ) => {
    if (navigation) {
        navigation.replace('LoginScreen');
      }

}
  
  if ( isLoading ) return <LoadingScreen /> 

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
