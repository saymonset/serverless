import React from 'react'
import { MainLayout } from '../../layouts/MainLayout';
import { useSendSms } from '../../hooks/useSendSms';
import { SendPhoneFigmaScreen } from './SendPhoneFigmaScreen';
import { RegisterScreen } from '../register/RegisterScreen';
import { SendCodeFigmaScreen } from './SendCodeFigmaScreen';
import { SeguridadFigmaScreen } from './SeguridadFigmaScreen';
import { LoginScreen } from '../auth/LoginScreen';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}
function HomeScreen({ navigation }:Props) {

  const { sendSmsStatus  } =  useSendSms();

 

  return (
    <>

      <MainLayout
        title="Vaccines"
        subTitle="Aplicación vaccines">
        { (sendSmsStatus === 'isPhone') && <SendPhoneFigmaScreen/> }
        { (sendSmsStatus === 'isCode') && <SendCodeFigmaScreen/> }
        { (sendSmsStatus === 'isSeguridad') && <SeguridadFigmaScreen/> }
        { (sendSmsStatus === 'isRegister') && <RegisterScreen/> }
        { (sendSmsStatus === 'isLogin') && <LoginScreen navigation={undefined} route={undefined}/> }
      </MainLayout>
    </>
  )
}

export default HomeScreen