import { StackScreenProps } from '@react-navigation/stack';
import { Button, Divider, Input, Layout, Text } from '@ui-kitten/components'
import { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler'
import { Alert, Platform, Pressable, useWindowDimensions } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { MyIcon } from '../../components/ui/MyIcon';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import { increment } from '../../store/slices/counter';
import { useLogin } from '../../hooks/useLogin';
import { loginCiThunks } from '../../store/slices/login/loginThunks';
import { loginSlice } from '../../store/slices/login/loginSlice';
import { useNavigation } from '@react-navigation/native';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from '../loading/LoadingScreen';
import { WelcomeScreen } from '../home/WelcomeFigmaScreen';


interface Props extends StackScreenProps<RootStackParams, 'PasswordRecoveryScreen'> {}

export const PasswordRecoveryScreen =  () => {
  {
   
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const { login, token, message, isLoading } =  useLogin();

    const { value } = useSelector((state: RootState) => state.counter)
    const dispatch= useDispatch();

    const [ inputValue, setInputValue ] = useState('');
    const [ codValue, setCodValue ] = useState('');
    const inputRef = useRef(null);
      
    const onLogin = async() => {
      if ( form.ci.length === 0 || form.password.length === 0 ) {
        return;
      }
     // const wasSuccessful = dispatch(loginCiThunks({ ci: form.email, password: form.password }));
      //login( form.ci, form.password);
      //if ( wasSuccessful ) return;
      if( form.password.trim().length <= 7){
        setShowWarnings(true);
        return;
      }
     // await dispatch(loginCiThunks( ci, password));
    }
    

    // const { login } = useAuthStore();
    
    const [form, setForm] = useState({
      ci: '',
      password: '',
    });

    const [secureText, setSecureText] = useState(true);
    const [showWarnings, setShowWarnings] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [ password, setPassword ] = useState('');
  
 

    const onInputChange = (value:any) => {
      setPassword( value );
  }
  
  
  const toggleSecureText = () => {
    setSecureText(!secureText);
  }
  
   
  const onSecurityInputChange = (value:string) => {
    if (value.length > 8) {
        setShowWarnings(false);
      }
  }

  const onCodInputChange = (value:string) => {
    setCodValue( value );
    if (value.length === 3 && inputRef.current) {
         inputRef.current.focus(); // Salta al campo inputValue
      }
  }
  
  const onSubmit = async( ) => {
    console.log('pasa');
    if( codValue.trim().length <= 1) return;
    if( inputValue.trim().length <= 1) return;
    let phone = codValue.trim()+inputValue.trim();
   // enviarCodeSendSms(phone);
     
    setInputValue('');
    setCodValue( '' );
}


       {/* Solo para sacar mensajes de error por pantalla */}
       useEffect(() => {
        if( message?.length === 0 ) return;
        Alert.alert('Info', message);
       }, [ message ])

    return (
      <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal:20}}>
        <Layout style={{paddingTop: height * 0.030}}>
          <Text category="h1">Contraseña olvidada</Text>
         
          <Layout style = {{ marginVertical:10}}>
             <Text style = {{ marginVertical:10}} category="p2">Cedula de identidad <Text style={{ color: 'skyblue'}}>*</Text></Text>
             {/* Inputs */}
                <Input 
                    placeholder="V- 12345678"
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={[ 
                      stylesFigma.inputField,
                        ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                        {marginRight:90}
                    ]}
                    selectionColor="white"
                    onChangeText={ (ci) => setForm({ ...form, ci })}
                    value={ form.ci }
                    onSubmitEditing={ onLogin }
                    autoCapitalize="words"
                    autoCorrect={ false }
                />
           </Layout>
           <Layout style={{flexDirection:'row'}}>
                       <Text style = {{ marginVertical:10}} category="p2">Número de telefono. <Text style={{ color: 'skyblue'}}>*</Text></Text>
                     
                  </Layout>
           
           <Layout style={{flex:1, flexDirection:'row', justifyContent:'space-between',marginTop: 0}}>
                <Layout  style={{flex:1,  flexWrap:'wrap', left:0, marginRight:0}}>
                        <Input
                        placeholder="+58"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        underlineColorAndroid="rgba(0,0,0,0)"
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
                </Layout>
                <Layout   style={{flex:2, right: ( Platform.OS === 'ios' )?60:90, marginBottom:0}}>
                    <Input
                            ref={inputRef} // Referencia al campo inputValue
                            placeholder="Número de télefono"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            underlineColorAndroid="rgba(0,0,0,0)"
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
                </Layout>
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
             onPress= { onLogin }>
              
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