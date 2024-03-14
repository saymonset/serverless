import React, {  useState, useRef} from 'react';
import { Text, View, TextInput, Platform,  TouchableOpacity, Keyboard , Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  sendSmsThunks, sendSmsFirstPrimaryThunks } from '../store/slices/sendSms/index' ;
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';

import { LoadingScreen } from '../screens/LoadingScreen';

 

export const  SendPhonFigmaComponent = ({ navigation }) => {
   
  const [ inputValue, setInputValue ] = useState('');
  const [ codValue, setCodValue ] = useState('');
  const inputRef = useRef(null);
  const { isLoading } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();


  
  
  
  
  const onInputChange = (value) => {
      setInputValue( value );
  }

  const onCodInputChange = (value) => {
    setCodValue( value );
    if (value.length === 3) {
        inputRef.current.focus(); // Salta al campo inputValue
      }
}

  const onSubmit = async( event ) => {
      Keyboard.dismiss();
      event.preventDefault();
      if( codValue.trim().length <= 1) return;
      if( inputValue.trim().length <= 1) return;
      let phone = codValue.trim()+inputValue.trim()
         {/* Una vez que mande el phone, se actualiza una bandera en el store isSendCode y 
                                esta en true  te redirije a colocar el codigo envisdo 
                            en  la pantala SendPhoneFigmaScreen en cerrarModal */}
     // await dispatch(sendSmsThunks( phone ));
      await dispatch(sendSmsFirstPrimaryThunks( phone ));
      setInputValue('');
      setCodValue( '' );
  }


  
  if ( isLoading ) return <LoadingScreen /> 

  return (
      <>
            {/* <Text style={ stylesFigma.label }>Phone:</Text> */}
            <View  style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
                <View style={{flex:1}}>
                    <View  style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:1,  flexWrap:'wrap', left:30, marginRight:20}}>
                                <TextInput 
                                                            placeholder="+58"
                                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                                            underlineColorAndroid="rgba(0,0,0,0.4)"
                                                            style={[ 
                                                                stylesFigma.inputField,
                                                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                            ]}
                                                            onChangeText={ (value) => onCodInputChange(value) }
                                                            value={ codValue }
                                                            onSubmitEditing={ onSubmit }
                                                            autoCapitalize="none"
                                                            autoCorrect={ false }
                                                            maxLength={3} // Limita la entrada a tres caracteres
                                                            />
                        </View>
                
                        <View style={{flex:2, right: ( Platform.OS === 'ios' )?60:90, marginBottom:0}}>
                                <TextInput 
                                                            ref={inputRef} // Referencia al campo inputValue
                                                            placeholder="Número de télefono"
                                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                                            underlineColorAndroid="rgba(0,0,0,0.4)"
                                                            style={[ 
                                                                stylesFigma.inputField,
                                                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                            ]}
                                                            selectionColor="rgba(0,0,0,0.4)"
                                                            onChangeText={ (value) => onInputChange(value) }
                                                            value={ inputValue }
                                                            onSubmitEditing={ onSubmit }
                                                            autoCapitalize="none"
                                                            autoCorrect={ false }
                                                            maxLength={15} // Limita la entrada a tres caracteres
                                                            />
                        </View>
                    </View>
                </View>

                  <View style={{flex:1}}>
                        <HeaderTitleFigma title="Al continuar acepta nuestra Politica de Privacidad y
                                acepta que ha leído nuestros Términos y condiciones de Uso." 
                                                                                    marginTop={(Platform.OS === 'ios') ? -40: -40}
                                                                                    marginBottom={(Platform.OS === 'ios') ? 50: 0}
                                                                                    stylesFigma={stylesFigma}
                                                                                    type='small'
                                                                                    ></HeaderTitleFigma>
                    </View>  
                  
       
              {/* Boton Send Msg */}
                      
                             <View style={ {...stylesFigma.buttonContainer,
                                               alignItems:'center',
                                               marginTop:(Platform.OS === 'ios') ? 0: 0, 
                                               marginBottom:(Platform.OS === 'ios') ? 100: 100} }>
                                                <TouchableOpacity
                                                    activeOpacity={ 0.8 }
                                                    style={ stylesFigma.button }
                                                    onPress={ onSubmit }
                                                >
                                                   <Text style={ stylesFigma.buttonText } >Enviar código</Text>
                                                </TouchableOpacity>
                              </View>
        </View>
    </>
  )
}
