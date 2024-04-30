import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView, useWindowDimensions } from 'react-native';
import { RootStackParams } from '../../navigation/StackNavigator'
import { useSendSms } from '../../hooks/useSendSms'
import { stylesFigma } from '../theme/appFigmaTheme'
import { LoadingScreen } from '../loading/LoadingScreen'
import { SendCodeComponent } from '../../components/sendCodeComponent'
import { MainLayout } from '../../layouts/MainLayout';
import { PasswordRecoveryTwiceScreen } from '../auth/PasswordRecoveryTwiceScreen';
import { LoginScreen } from '../auth/LoginScreen';
import { PasswordRecoveryScreen } from '../auth/PasswordRecoveryScreen';
import { useNavigation } from '@react-navigation/native';


interface Props extends StackScreenProps<RootStackParams, 'SendCodeFigmaScreen'> {}
export const SendCodeRecoveryFigmaScreen = () => {

   const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const [ inputValue, setInputValue ] = useState('');
    const [ codValue, setCodValue ] = useState('');
    const inputRef = useRef(null);

    const { message, resp, removeError, sendSmsStatus} =  useSendSms();

    useEffect(() => {
      if( resp ){
        navigation.navigate('LoginScreen' as never) 
        return;
      }  
        
             
     }, [ resp ])

    const cerrarModal = () => {
        Alert.alert('', message);
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
    <MainLayout
    title="Vaccines"
    subTitle="Aplicación vaccines">
    { (sendSmsStatus === 'isPhone') && <PasswordRecoveryScreen/> }
    { (sendSmsStatus === 'isCode') && <SendCodeComponent/> }
    { (sendSmsStatus === 'isSeguridad') && <PasswordRecoveryTwiceScreen/> }
    { (sendSmsStatus === 'isLogin') && <LoginScreen navigation={undefined} route={undefined}/> }
  </MainLayout>
    // <Layout style={{ flex:1 }}>
    //   <ScrollView style={{marginHorizontal: 40}}>
    //     <Layout style={{paddingTop: height * 0.05}}>
    //         <SendCodeComponent></SendCodeComponent>
    //     </Layout>
    //   </ScrollView>
            
    // </Layout>
  )
}
