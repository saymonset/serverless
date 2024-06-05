import { StackScreenProps } from '@react-navigation/stack';
import { Button, Divider, Input, Layout, Text } from '@ui-kitten/components'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler'
import { Alert, Platform, Pressable, useWindowDimensions } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { MyIcon } from '../../components/ui/MyIcon';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store';
import { increment } from '../../store/slices/counter';
import { useLogin } from '../../hooks/useLogin';
 
import { useNavigation } from '@react-navigation/native';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from '../loading/LoadingScreen';
import { WelcomeScreen } from '../home/WelcomeFigmaScreen';
import { useSendSms } from '../../hooks/useSendSms';


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen =  () => {
  {
   
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
    const { token, message, isLoading, removeMessage, login } =  useLogin();
    const { clearSendSmsStatus, sendSmsPhone } =  useSendSms();

    const { value } = useSelector((state: RootState) => state.counter)
    const dispatch= useDispatch();
      
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
     login( form.ci, form.password.trim());
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

     


       {/* Solo para sacar mensajes de error por pantalla */}
       useEffect(() => {
       
        if( message?.length === 0 ) return;
        Alert.alert('Info', message);
        removeMessage();
       }, [ message ])

    return (
      <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 20}}>
        <Layout style={{paddingTop: height * 0.030}}>
          <Text category="h1">Iniciar sesión</Text>
         
          <Layout style = {{ marginVertical:10}}>
             <Text style = {{ marginVertical:10}} category="p2">Cedula de identidad</Text>
             {/* Inputs */}
                <Input 
                    placeholder="V- 12345678"
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    style={[ 
                      stylesFigma.inputField,
                        ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                    ]}
                    selectionColor="white"
                    onChangeText={ (ci) => setForm({ ...form, ci })}
                    value={ form.ci }
                    onSubmitEditing={ onLogin }
                    autoCapitalize="words"
                    autoCorrect={ false }
                />
           </Layout>
          <Layout style = {{ marginVertical:10, marginTop:0}}>
           
                  <Text style = {{ marginVertical:10}} category="p2">Contraseña</Text>
              <Layout style={{ flexDirection:'row'}}>   
                  <Layout style={{flex:9, marginBottom:0}}> 
                      {/* Inputs */}
                      <Input 
                            placeholder="******"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            underlineColorAndroid="rgba(0,0,0,0)"
                            secureTextEntry={secureText}
                            maxLength={16}
                            style={[ 
                                stylesFigma.inputField,
                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                            ]}
                            selectionColor="white"
                            onChangeText={ (password) => {
                                 setForm({ ...form, password })
                                onInputChange(password);
                                onSecurityInputChange( password );
                            } }
                            value={ form.password }
                            onSubmitEditing={ onLogin }
                            autoCapitalize="none"
                            autoCorrect={ false }
                            />
                  </Layout> 
                  <Layout style={{flex:1, marginLeft:1}}>
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


        </Layout>

        {/* Space */}
        <Layout style={{height: 10}} />

        {/* Button */}
        <Layout style={{marginTop:(Platform.OS === 'ios') ? 20: 20, marginHorizontal:80, alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center', }}>
          <Button 
             disabled={ isLoading }
             activeOpacity={ 0.8 }
             style={  [{...stylesFigma.button} ]}
             onPress= { onLogin }>
              
              <Text style={ stylesFigma.buttonText } >Entrar</Text>

            </Button>
        </Layout>

        {/* Espacio */}
        <Layout style={{height: 50}} />

        <Layout
          style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text onPress={ () => {
            /* Limpiamods los estados del sendSmsStatus */
                  clearSendSmsStatus();
                  /* Colocamos la bandera del phone para pedirla junto a la cedula  en SendCodeRecoveryFigmaScreen*/
                  sendSmsPhone();
                  navigation.navigate("SendCodeRecoveryFigmaScreen" as never);
          } }
                   style={{color:'skyblue'}}>¿Olvidates tu contraseña?</Text>
         
        </Layout>
       
          {/* <Text style={{ marginHorizontal:120, marginBottom:0, borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 2 }} />  */}
          <Divider style={{ marginTop:20, marginHorizontal:60, marginBottom:0, borderBottomColor: 'rgba(0,0,0,0.1)', borderBottomWidth: 2 }} />
        {   ( isLoading ) && <LoadingScreen /> }    
         {/* Espacio */}
         <Layout  style={{marginTop:(Platform.OS === 'ios') ? 180: 100}} />
         <Layout style={{marginTop:0, marginLeft:(Platform.OS === 'ios') ? 70: 80}}>
              <Pressable onPress={() => {}}>
                <Layout style={{flexDirection:'row'}}>
                      <Text 
                              style={{ color: 'black' }}>¿No tienes cuenta aun?
                              
                      </Text>
                      <Text  onPress={() => navigation.navigate('WelcomeScreen' as never)} 
                             style={{ color: 'skyblue',paddingLeft:10 }}>Registrate</Text>
                  </Layout>
              </Pressable>
          </Layout>
      </ScrollView>
    </Layout>
    )
  }
}