import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler'
import { Alert, Platform, Pressable, useWindowDimensions } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { MyIcon } from '../../components/ui/MyIcon';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import { useNavigation } from '@react-navigation/native';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from '../loading/LoadingScreen';
import { useSendSms } from '../../hooks/useSendSms';


interface Props extends StackScreenProps<RootStackParams, 'PasswordRecoveryTwiceScreen'> {}

export const PasswordRecoveryTwiceScreen =  () => {
  {
   
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const {message, isLoading, ci, phone, resp, removeError, changuePassword } =  useSendSms();
    const [secureText, setSecureText] = useState(true);
    const [showWarnings, setShowWarnings] = useState(false);
    const [secureText_II, setSecureText_II] = useState(true);
    const [showWarnings_II, setShowWarnings_II] = useState(false);
    const [ inputValue_II, setInputValue_II ] = useState('');
    const [ inputValue, setInputValue ] = useState('');
    const { value } = useSelector((state: RootState) => state.counter)
    const dispatch= useDispatch();
    const [ codValue, setCodValue ] = useState('');
    const tlfRef = useRef(null);
      
 
    
    
    const onSubmit = async( ) => {
      if( inputValue.trim().length <= 7){
        setShowWarnings(true);
        return;
      }
      if( inputValue_II.trim().length <= 7){
        setShowWarnings_II(true);
        return;
      }
     
      if (!ci || !phone){
        //Alert.alert('Error', 'ci or phone missing in the store');
        return;
      }
      if (inputValue === inputValue_II) {
        // Passwords are equal
        // Proceed with the rest of the code
        changuePassword( phone, ci, inputValue  );
      } else {
        // Passwords are not equal
        Alert.alert('Error','Las contraseñas deben ser iguales');
      }
       
  }

  const toggleSecureText = () => {
    setSecureText(!secureText);
  }
 
  const onInputChange = (value:any) => {
    setInputValue( value );
  }

  const onSecurityInputChange = (value: string) => {
    if (value.length > 8) {
        setShowWarnings(false);
      }
  }
 

 
  

  const onSecurityInputChange_II = (value) => {
    if (value.length > 8) {
        setShowWarnings_II(false);
      }
  }
  const onInputChange_II = (value:any) => {
      setInputValue_II( value );
  }

  const toggleSecureText_II = () => {
    setSecureText_II(!secureText_II);
  }      

  

  
       

    return (
      <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal:20}}>
           <Layout style={{paddingTop: height * 0.030}}>
              <Text category="h4">Reestablece tu contraseña</Text>
            
          <Layout style={{ marginBottom:30, 
                      flexDirection:'column',
                      marginHorizontal:20}}> 
              <Layout style={{ flexDirection:'row'}}>
                                  <Layout style={{flex:9, marginBottom:0}}>
                                          <Input 
                                                  placeholder="******"
                                                  placeholderTextColor="rgba(0,0,0,0.4)"
                                                  underlineColorAndroid="rgba(0,0,0,0)"
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
                                  </Layout>
                                  <Layout style={{flex:1, marginLeft:20}}>
                                      <Pressable
                                                onPress={toggleSecureText}
                                            >
                                                 { secureText ?  (<MyIcon name="eye-outline" /> ):(<MyIcon name="eye-off-outline" /> )}
                                     </Pressable>
                                  </Layout>
              </Layout>
              { showWarnings && (<Layout style={{flexDirection:'row', marginTop:10}}>
                         <MyIcon name="alert-triangle-outline" />
                         <Text style={{textAlign:'center', color:'red'}}>Debe contener al menos 8 caracteres</Text>
                </Layout>)}                      
         </Layout>  

          

           <Layout style={{ marginBottom:30, 
                          flexDirection:'column',
                          marginHorizontal:20}}> 
                   <Text category="h4">Confirma la nueva contraseña</Text>  
                  <Layout style={{ flexDirection:'row'}}>
                                      <Layout style={{flex:9, marginBottom:0}}>
                                              <Input 
                                                      placeholder="******"
                                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                                      underlineColorAndroid="rgba(0,0,0,0)"
                                                      secureTextEntry={secureText_II}
                                                      maxLength={16}
                                                      style={[ 
                                                          stylesFigma.inputField,
                                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                                      ]}
                                                      selectionColor="white"
                                                      onChangeText={ (value) => {
                                                          onInputChange_II(value);
                                                          onSecurityInputChange_II( value );
                                                      } }
                                                      value={ inputValue_II }
                                                      onSubmitEditing={ onSubmit }
                                                      autoCapitalize="none"
                                                      autoCorrect={ false }
                                                      />
                                      </Layout>
                                      <Layout style={{flex:1, marginLeft:20}}>
                                          <Pressable onPress={toggleSecureText_II}>
                                              { secureText_II ?  (<MyIcon name="eye-outline" /> ):(<MyIcon name="eye-off-outline" /> )}
                                          </Pressable>
                                      </Layout>
                  </Layout>
                  { showWarnings_II && (<Layout style={{flexDirection:'row', marginTop:10}}>
                                              <MyIcon name="alert-triangle-outline" />
                                              <Text style={{textAlign:'center', color:'red'}}>Debe contener al menos 8 caracteres</Text>
                                              
                                      </Layout>)}
          </Layout>  


        </Layout>

        {/* Space */}
        <Layout style={{height: 10}} />

        {/* Button */}
        <Layout style={{marginTop:(Platform.OS === 'ios') ? 20: 200, marginHorizontal:0, alignItems:'center'}}>
          <Button 
             activeOpacity={ 0.8 }
             style={{ paddingHorizontal: 20,
                      paddingVertical: 5,
                      borderRadius: 100,
                      marginHorizontal: 1,
                      width:270,
                      backgroundColor: '#0077FF'}}
             onPress= { onSubmit }>
              
              <Text style={ stylesFigma.buttonText } >Recuperar mi contraseña</Text>

            </Button>
        </Layout>

        {/* Espacio */}
        <Layout style={{height: 50}} />

       
          
        {   ( isLoading ) && <LoadingScreen /> }    
         {/* Espacio */}
         <Layout  style={{marginTop:(Platform.OS === 'ios') ? 180: 360}} />
         <Layout style={{marginTop:0, marginLeft:(Platform.OS === 'ios') ? 70: 180}}>
              <Pressable onPress={() => {}}>
                <Layout style={{flexDirection:'row'}}>
                      <Text onPress={ () => navigation.navigate("PasswordRecoveryScreen" as never) }
                              style={{ color: 'black' }}>¿Necesitas ayuda?
                              
                      </Text>
                      <Text  onPress={() => navigation.navigate('WelcomeScreen' as never)} 
                             style={{ color: 'skyblue',paddingLeft:10 }}>Contactanos</Text>
                    
                  </Layout>
              </Pressable>
          </Layout>
      </ScrollView>
    </Layout>
    )
  }
}