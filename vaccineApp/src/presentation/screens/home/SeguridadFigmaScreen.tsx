import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { RootStackParams } from '../../navigation/StackNavigator'
import { MyIcon } from '../../components/ui/MyIcon'
import { useSendSms } from '../../hooks/useSendSms'
import { MainLayout } from '../../layouts/MainLayout'
import { stylesFigma } from '../theme/appFigmaTheme'
import { LoadingScreen } from '../loading/LoadingScreen'


interface Props extends StackScreenProps<RootStackParams, 'SeguridadFigmaScreen'> {}
export const SeguridadFigmaScreen = () => {

    const [ inputValue, setInputValue ] = useState('');
    const inputRef = useRef(null);
    const [secureText, setSecureText] = useState(true);
    const [showWarnings, setShowWarnings] = useState(false);

    const { isLoading, message, phone , code, reEnviarCode, removeError, checkCode, putPassword} =  useSendSms();

    const onSubmit = async ( ) => {
        if( inputValue.trim().length <= 7){
            setShowWarnings(true);
            return;
          }
          setShowWarnings(false);
          putPassword( inputValue.trim())
          setInputValue('');
    }
   
    const toggleSecureText = () => {
        setSecureText(!secureText);
      }
    const onInputChange = (value: string) => {
        setInputValue( value );
    }
  
    const onSecurityInputChange = (value: string) => {
      if (value.length > 8) {
          setShowWarnings(false);
        }
  }
  

    const cerrarModal = () => {
        Alert.alert('Error', message);
        //Borramos mensajes del thrunk
        removeError();
  }

   {/* Solo para sacar mensajes de error por pantalla */}
   useEffect(() => {
    if( message && message.length === 0 ) return;
         // Si la respuesta es positiva entonces no sacamos ningun mensaje en el modal y nos vamos a otra pagina
    if( message && message.length > 0 )  cerrarModal();;      
           
}, [ message ])
    
  return (
    <>
 
        <Layout style={{ flex:1 }}>
        <ScrollView style={{marginHorizontal: 10}}>
        
               {/* Background */} 
          <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Seguridad</Text>
          
          <Text style={[stylesFigma.titlesecund, {textAlign:'left', left:10, marginTop:60}]}>Contraseña</Text>

             {/* Inputs */}
            <Layout     style={{flex:1, 
                        flexDirection:'column',
                        marginHorizontal:20}}>
                <Layout   style={{ flexDirection:'row'}}>
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
                    <Layout style={{flex:1, marginLeft:20}} 
                            >
                         <TouchableOpacity
                                                 
                                                onPress={toggleSecureText}
                                            >
                                                 { secureText ?  (<MyIcon name="eye-off-outline" /> ):(<MyIcon name="eye-outline" /> )}
                        </TouchableOpacity>
                      
                    </Layout>
                </Layout>
                { showWarnings && (<Layout style={{flexDirection:'row', marginTop:10}}>
                         <MyIcon name="alert-triangle-outline" />
                         <Text style={{textAlign:'center', color:'red'}}>Debe contener al menos 8 caracteres</Text>
                </Layout>)}
            </Layout>

                          

                      
                       {  isLoading && (  <LoadingScreen />  )}

                        <Layout style={{marginTop:(Platform.OS === 'ios') ? 20: 20, marginHorizontal:80 }}>
                                <Button 
                                    disabled={isLoading}
                                    onPress={onSubmit}>Siguiente</Button>
                        </Layout>
            

        </ScrollView>   
         </Layout>
     
    </>
  )
}
