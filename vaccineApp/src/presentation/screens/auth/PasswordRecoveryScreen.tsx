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
import { loginSlice } from '../../store/slices/login/loginSlice';
import { useNavigation } from '@react-navigation/native';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from '../loading/LoadingScreen';
import { WelcomeScreen } from '../home/WelcomeFigmaScreen';
import { useSendSms } from '../../hooks/useSendSms';


interface Props extends StackScreenProps<RootStackParams, 'PasswordRecoveryScreen'> {}

export const PasswordRecoveryScreen =  () => {
  {
   
    const navigation = useNavigation();
    const {height} = useWindowDimensions();
   // const {   token, message, isLoading } =  useLogin();
    const {message, isLoading, sendSmsStatus, passwordRecovery, removeError } =  useSendSms();

    const { value } = useSelector((state: RootState) => state.counter)
    const dispatch= useDispatch();
    const [ tlf, setTlf ] = useState('');
    const [ codValue, setCodValue ] = useState('');
    const tlfRef = useRef(null);
      
 
    const [form, setForm] = useState({
      ci: '' 
    });
    
    const onSubmit = async( ) => {
      if ( form.ci.length === 0 )  return;
      if( codValue.trim().length <= 1) return;
      if( tlf.trim().length <= 1) return;
      let phone = codValue.trim()+tlf.trim()
      let ci = form.ci;
      passwordRecovery(phone, ci);
      setTlf('');
      setCodValue( '' );
      setForm({ci:''});
  }
 
  const onInputChange = (value:any) => {
      setTlf( value );
  }
 

  const onCodInputChange = (value:string) => {
    setCodValue( value );
    if (value.length === 3 && tlfRef.current) {
         tlfRef.current.focus(); // Salta al campo tlfRef
      }
  }
  

       

       {/* Solo para sacar mensajes de error por pantalla */}
       useEffect(() => {
        if( message?.length === 0 ) return;
        Alert.alert('Info', message);
        removeError();
       }, [ message ])

  
       

    return (
      <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal:20}}>
        <Layout style={{paddingTop: height * 0.030}}>
          <Text category="h1">Contraseña olvidada</Text>
         
          <Layout style = {{ marginVertical:10}}>
             <Text  style = {{ marginVertical:10}}  category="p2">Cedula de identidad <Text style={{ color: 'skyblue'}}>*</Text></Text>
             {/* CEDULA */}
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
                    onSubmitEditing={ onSubmit }
                    autoCapitalize="words"
                    autoCorrect={ false }
                />
           </Layout>
           <Layout style={{flexDirection:'row'}}>
                       <Text style = {{ marginVertical:10}} category="p2">Número de telefono. <Text style={{ color: 'skyblue'}}>*</Text></Text>
                     
                  </Layout>
           
           <Layout style={{flex:1, flexDirection:'row', justifyContent:'space-between',marginTop: 10, left:0}}>
                {/* CODIGO */}
                {/* <Layout  style={{flex:1,  flexWrap:'wrap', left:0, marginRight:0}}> */}
                        <Input
                        placeholder="+58"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        underlineColorAndroid="rgba(0,0,0,0)"
                        style={[ 
                            stylesFigma.inputFieldPhoneCode,
                            ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                        ]}
                        onChangeText={ (value) => onCodInputChange(value) }
                        value={ codValue }
                        onSubmitEditing={ onSubmit }
                        autoCapitalize="none"
                        autoCorrect={ false }
                        maxLength={3} // Limita la entrada a tres caracteres
                    />
                {/* </Layout> */}
                 {/* TELEFONO */}
                {/* <Layout   style={{flex:2, right: ( Platform.OS === 'ios' )?60:90, marginBottom:0}}> */}
                    <Input
                            ref={tlfRef} // Referencia al campo inputValue
                            placeholder="Número de télefono"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={[ 
                                stylesFigma.inputFieldPhone,
                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                            ]}
                            selectionColor="rgba(0,0,0,0.4)"
                            onChangeText={ (value) => onInputChange(value) }
                            value={ tlf }
                            onSubmitEditing={ onSubmit }
                            autoCapitalize="none"
                            autoCorrect={ false }
                            maxLength={15} // Limita la entrada a tres caracteres
                    />
                {/* </Layout> */}
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