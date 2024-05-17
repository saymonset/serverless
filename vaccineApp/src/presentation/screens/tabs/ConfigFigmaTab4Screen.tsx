import { Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { Platform, StyleSheet } from 'react-native';
import { useVaccines } from '../../hooks/useVaccines';
import { stylesFigma } from '../theme/appFigmaTheme';
import { CardsFigmaScreen } from '../vaccines/CardsFigmaScreen';
import { ConfigFigmaScreen } from '../vaccines/ConfigFigmaScreen';
import { NextAppointmentsScreen } from '../vaccines/NextAppointmentsScreen';
import WatchYourHealthScreen from '../vaccines/WatchYourHealthScreen';

export const ConfigFigmaTab4Screen = () => {
  const { putNameVaccineSelect} = useVaccines();
 
  //Este nombre se coloca apenas selecciones un dosis de la vacuna 
  useEffect(() => {
       putNameVaccineSelect('');
  }, [])
  
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




