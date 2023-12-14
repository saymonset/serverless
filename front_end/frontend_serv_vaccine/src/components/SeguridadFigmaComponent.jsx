import React, {  useState, useContext, useEffect, useRef} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import { putPasswordThunks } from '../store/slices/register/registerThunks' 
import { LoadingScreen } from '../screens/LoadingScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';


export const  SeguridadFigmaComponent = ({ navigation }) => {
  const inputRef = useRef(null);
  const [ inputValue, setInputValue ] = useState('');


  const { isLoading, message, phone } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();

  const [secureText, setSecureText] = useState(true);
  const [showWarnings, setShowWarnings] = useState(false);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  }

  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onSecurityInputChange = (value) => {
    if (value.length > 8) {
        setShowWarnings(false);
      }
}

  const onSubmit = async ( event ) => {
      event.preventDefault();
      if( inputValue.trim().length <= 7){
        setShowWarnings(true);
        return;
      }
      setShowWarnings(false);
      
      await dispatch(putPasswordThunks( inputValue.trim()));
      setInputValue('');
      
      navigation.replace('RegistrodatosFigmaScreen');
      
  }

 

   if ( isLoading ) return <LoadingScreen /> 

  return (
      <>

<View style={{flex:1, 
              flexDirection:'column',
              marginHorizontal:20}}> 
         <View style={{ flexDirection:'row'}}>
                    <View style={{flex:9, marginBottom:0}}>
                            <TextInput 
                                                                            placeholder="******"
                                                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                                                            underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                            secureTextEntry={secureText}
                                                                            maxLength={16}
                                                                            style={[ 
                                                                                stylesFigma.inputField,
                                                                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                                            ]}
                                                                            selectionColor="white"
                                                                            onChangeText={ (value) => {
                                                                                onInputChange(value);
                                                                                onSecurityInputChange( value );
                                                                            } }
                                                                            value={ inputValue }
                                                                            onSubmitEditing={ onSubmit }
                                                                            autoCapitalize="none"
                                                                            autoCorrect={ false }
                                                                            />
                    </View>
                    <View style={{flex:1, marginLeft:20}}>
                        <TouchableOpacity onPress={toggleSecureText}>
                            <Ionicons name={secureText ? 'eye' : 'eye-off'} size={24} color="black" />
                        </TouchableOpacity>
                    </View>
         </View>
         { showWarnings && (<View style={{flexDirection:'row', marginTop:10}}>
                    <Ionicons style={{ marginLeft:10,  marginRight:10}} name="radio-button-on-outline" size={20} color="red" />
                    <Text style={{textAlign:'center', color:'red'}}>Debe contener al menos 8 caracteres</Text>
         </View>)}
         <View style={ {...stylesFigma.buttonContainer, alignItems:'center', marginTop:20} }>
                                            <TouchableOpacity
                                                activeOpacity={ 0.8 }
                                                style={ stylesFigma.button }
                                                onPress={ onSubmit }
                                            >
                                                <Text style={ stylesFigma.buttonText } >Siguiente</Text>
                                            </TouchableOpacity>
                                        </View> 
       
</View>
 
         
    </>
  )
}
