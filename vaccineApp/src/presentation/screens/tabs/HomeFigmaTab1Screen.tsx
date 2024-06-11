import { Layout, Text } from '@ui-kitten/components'
import React, { useState } from 'react'
import { Platform, StyleSheet } from 'react-native';
import { stylesFigma } from '../theme/appFigmaTheme';
import { CardsFigmaScreen } from '../vaccines/CardsFigmaScreen';
import { ConfigFigmaScreen } from '../vaccines/ConfigFigmaScreen';
import { NextAppointmentsScreen } from '../vaccines/NextAppointmentsScreen';
import WatchYourHealthScreen from '../vaccines/WatchYourHealthScreen';

export const HomeFigmaTab1Screen = () => {
 
   
  
  return (
    <Layout style={stylesFigma.container}>
      <Layout style={[stylesFigma.card, { marginTop: 10, marginBottom: (Platform.OS==='ios') ? 40 : 20 }]}>
        {/* ` En CardsFigmaScreen aparece la tarjeta de (Consultas, Vacunacion, Embarazo, Patologias ) .` */}
        <CardsFigmaScreen/>
      </Layout>
      <Layout style={[stylesFigma.card, { marginTop: 10, marginBottom: 20 }]}>
         {/* ` En NextAppointmentsScreen aparece PROXIMAS CITAS */}
           <NextAppointmentsScreen/>
      </Layout>
      <Layout style={[stylesFigma.card, { marginTop: 10, marginBottom: 20 }]} >
        {/* ` En NextAppointmentsScreen aparece CUIDA TU SALUD */}
            <WatchYourHealthScreen/>
      </Layout>
    </Layout>
  )
}




