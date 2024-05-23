import { Layout } from '@ui-kitten/components'
import React, { useEffect } from 'react'
import { Platform } from 'react-native';
import { useVaccines } from '../../hooks/useVaccines';
import { stylesFigma } from '../theme/appFigmaTheme';
import { ConfigFigmaScreen } from '../vaccines/ConfigFigmaScreen';

export const ConfigFigmaTab4Screen = () => {

  return (
    <Layout style={stylesFigma.container}>
      <Layout style={[stylesFigma.card, { marginTop: 10, marginBottom: (Platform.OS==='ios') ? 40 : 0 }]}>
        {/* ` En CardsFigmaScreen aparece la tarjeta de (Consultas, Vacunacion, Embarazo, Patologias ) .` */}
        <ConfigFigmaScreen/>
      </Layout>
      <Layout style={[stylesFigma.card, { marginTop: 0, marginBottom: 0 }]}>
         {/* ` En NextAppointmentsScreen aparece PROXIMAS CITAS */}
           {/* <NextAppointmentsScreen/> */}
      </Layout>
      <Layout style={[stylesFigma.card, { marginTop: 10, marginBottom: 5 }]} >
        {/* ` En NextAppointmentsScreen aparece CUIDA TU SALUD */}
            {/* <WatchYourHealthScreen/> */}
      </Layout>
    </Layout>
  )
}




