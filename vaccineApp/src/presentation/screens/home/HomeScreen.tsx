import React from 'react'
import { MainLayout } from '../../layouts/MainLayout';
import { useSendSms } from '../../hooks/useSendSms';
import { SendPhoneFigmaScreen } from './SendPhoneFigmaScreen';
import { SendRegisterFigmaScreen } from './SendRegisterFigmaScreen';
import { SendCodeFigmaScreen } from './SendCodeFigmaScreen';
import { SeguridadFigmaScreen } from './SeguridadFigmaScreen';

function HomeScreen() {

  const { sendSmsStatus  } =  useSendSms();

 

  return (
    <>

      <MainLayout
        title="Vaccines"
        subTitle="Aplicación vaccines">
        { (sendSmsStatus === 'isPhone') && <SendPhoneFigmaScreen/> }
        { (sendSmsStatus === 'isCode') && <SendCodeFigmaScreen/> }
        { (sendSmsStatus === 'isSeguridad') && <SeguridadFigmaScreen/> }
        { (sendSmsStatus === 'isRegister') && <SendRegisterFigmaScreen/> }
      </MainLayout>
    </>
  )
}

export default HomeScreen