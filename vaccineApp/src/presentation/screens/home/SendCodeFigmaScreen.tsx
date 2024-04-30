import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView } from 'react-native'
import { RootStackParams } from '../../navigation/StackNavigator'
import { useSendSms } from '../../hooks/useSendSms'
import { stylesFigma } from '../theme/appFigmaTheme'
import { LoadingScreen } from '../loading/LoadingScreen'
import { SendCodeComponent } from '../../components/sendCodeComponent'


interface Props extends StackScreenProps<RootStackParams, 'SendCodeFigmaScreen'> {}
export const SendCodeFigmaScreen = () => {

    const [ inputValue, setInputValue ] = useState('');
    const [ codValue, setCodValue ] = useState('');
    const inputRef = useRef(null);

    const { message, removeError} =  useSendSms();

     

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
 
            <SendCodeComponent></SendCodeComponent>
     
    </>
  )
}
