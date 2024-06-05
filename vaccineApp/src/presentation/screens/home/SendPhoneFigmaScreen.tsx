import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView } from 'react-native'
import { RootStackParams } from '../../navigation/StackNavigator'
import { useSendSms } from '../../hooks/useSendSms'
import { MainLayout } from '../../layouts/MainLayout'
import { stylesFigma } from '../theme/appFigmaTheme'
import { LoadingScreen } from '../loading/LoadingScreen'


interface Props extends StackScreenProps<RootStackParams, 'SendPhoneFigmaScreen'> {}
export const SendPhoneFigmaScreen = () => {

    const [ inputValue, setInputValue ] = useState('');
    const [ codValue, setCodValue ] = useState('');
    const inputRef = useRef(null);

    const { message, removeError, isLoading, enviarCodeSendSms } =  useSendSms();

    const cerrarModal = () => {
        Alert.alert('Error', message);
        //Borramos mensajes del thrunk
        removeError();
  }
    

    const onSubmit = async( ) => {
        
        if( codValue.trim().length <= 1) return;
        if( inputValue.trim().length <= 1) return;
        let phone = codValue.trim()+inputValue.trim();
        enviarCodeSendSms(phone);
         
        setInputValue('');
        setCodValue( '' );
    }

    const onInputChange = (value:string) => {
        setInputValue( value );
    }

    const onCodInputChange = (value:string) => {
        setCodValue( value );
        if (value.length === 3 && inputRef.current) {
             inputRef.current.focus(); // Salta al campo inputValue
          }
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
          <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Ingresa tu número de teléfono</Text>
          
          <Text style={[stylesFigma.titlesecund, {textAlign:'left', left:10, marginTop:60}]}>Te enviaremos un mensaje SMS para verificar tu número de teléfono</Text>

          
          <Text style={[stylesFigma.titlesecund, {textAlign:'left', left:10, marginTop:100}]}>Número de télefono</Text>

             {/* Inputs */}
            <Layout style={{flex:1, flexDirection:'row', justifyContent:'space-between',marginTop: 10, left:40}}>
                {/* <Layout  style={{flex:1,  flexWrap:'wrap', left:0, marginRight:0}}> */}
                        <Input
                        placeholder="+58"
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        underlineColorAndroid="rgba(0,0,0,0)"
                        style={[ 
                            stylesFigma.inputFieldPhoneCode,
                            ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                            {  marginRight:0,
                                textAlign: 'center'}
                        ]}
                        onChangeText={ (value) => onCodInputChange(value) }
                        value={ codValue }
                        onSubmitEditing={ onSubmit }
                        autoCapitalize="none"
                        autoCorrect={ false }
                        maxLength={3} // Limita la entrada a tres caracteres
                    />
                {/* </Layout> */}
                {/* <Layout   style={{flex:2, right: ( Platform.OS === 'ios' )?60:90, marginBottom:0}}> */}
                    <Input
                            ref={inputRef} // Referencia al campo inputValue
                            placeholder="Número de télefono"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={[ 
                                stylesFigma.inputFieldPhone,
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
                {/* </Layout> */}
            </Layout>

            <Layout style={{ flex:1 }}>
                       {  isLoading && (  <LoadingScreen />  )}

                        <Text style={[stylesFigma.titlesecund, {textAlign:'left', left:10, marginTop:20}]}>
                        Al continuar acepta nuestra Politica de Privacidad y
                                                acepta que ha leído nuestros Términos y condiciones de Uso.
                        </Text>
                        {/* Button */}
                        <Layout style={{marginTop:(Platform.OS === 'ios') ? 20: 20, marginHorizontal:80 }}>
                                <Button 
                                    disabled={isLoading}
                                
                                    onPress={onSubmit}>Enviar código</Button>
                        </Layout>
            </Layout>

        </ScrollView>   
         </Layout>
    </>
  )
}
