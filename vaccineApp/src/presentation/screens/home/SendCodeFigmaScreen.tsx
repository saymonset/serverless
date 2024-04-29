import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView } from 'react-native'
import { RootStackParams } from '../../navigation/StackNavigator'
import { useSendSms } from '../../hooks/useSendSms'
import { MainLayout } from '../../layouts/MainLayout'
import { stylesFigma } from '../theme/appFigmaTheme'
import { LoadingScreen } from '../loading/LoadingScreen'


interface Props extends StackScreenProps<RootStackParams, 'SendCodeFigmaScreen'> {}
export const SendCodeFigmaScreen = () => {

    const [ inputValue, setInputValue ] = useState('');
    const [ codValue, setCodValue ] = useState('');
    const inputRef = useRef(null);

    const { message, phone , reEnviarCode, removeError, checkCode, isLoading} =  useSendSms();

    const onSubmit = async ( ) => {
        if( inputValue.trim().length <= 1) return;
            checkCode( phone, inputValue.trim());
            setInputValue('');
    }
   

    const onInputChange = (value:string) => {
        setInputValue( value );
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
          <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Revisa tu bandeja de mensajes</Text>
          
          <Text style={[stylesFigma.titlesecund, {textAlign:'left', left:10, marginTop:60}]}>Para completar la verificación de tu número de teléfono, 
                                        por favor, ingresa el código deactivación de 6 digitos</Text>

          
          <Text style={[stylesFigma.titlesecund, {textAlign:'center', left:10, marginTop:100}]}>Ingresa el código</Text>

             {/* Inputs */}
            <Layout style={{flex:1, flexDirection:'row', justifyContent:'space-between',marginTop: 10}}>
                <Layout   style={{flex:2, right: ( Platform.OS === 'ios' )?0:0, marginBottom:0}}>
                    <Input

                            placeholder="123456 |"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={[ 
                                stylesFigma.inputField,
                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                                {marginHorizontal:30}
                            ]}
                            selectionColor="white"
                            onChangeText={ (value) => onInputChange(value) }
                            value={ inputValue }
                            onSubmitEditing={ onSubmit }
                            autoCapitalize="none"
                            autoCorrect={ false }
                            
                             
                            maxLength={10} // Limita la entrada a tres caracteres
                    />
                </Layout>
            </Layout>

            <Layout style={{ flex:1 }}>
              
                        {  isLoading && (  <LoadingScreen />  )}

                        <Text style={[stylesFigma.titlesecund, {textAlign:'left', left:10, marginTop:20}]}>
                        ¿No has recibido ningún código?
                        </Text>

                        {/* Button */}
                        <Layout style={{marginTop:(Platform.OS === 'ios') ? 0: 0, marginHorizontal:80 }}>
                        <Text 
                                status="primary" 
                                category="s1"
                                // onPress={() => dispatch(increment())}
                                onPress={ () =>reEnviarCode(phone)}
                            >
            Enviar de nuevo
          </Text>
                        </Layout>
                        <Layout style={{marginTop:(Platform.OS === 'ios') ? 20: 20, marginHorizontal:80 }}>
                                <Button 
                                    disabled={isLoading}
                                    onPress={onSubmit}>Siguiente</Button>
                        </Layout>
            </Layout>

        </ScrollView>   
         </Layout>
     
    </>
  )
}
