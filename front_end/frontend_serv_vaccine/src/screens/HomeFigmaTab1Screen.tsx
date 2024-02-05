import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { AuthContext } from '../context/AuthContext';
import { CardsFigmaScreen } from './CardsFigmaScreen';
import { NextAppointmentsScreen } from './NextAppointmentsScreen';
import { WatchYourHealthScreen } from './WatchYourHealthScreen';

export const HomeFigmaTab1Screen = () => {
  const {  usuario:{ token }  } = useSelector((state: store) => state.loginStore);
  const {  getGeneroRaltionSchipLoads, getDosisVaccinesLoads } = useContext(AuthContext)
  useEffect(() => {
  
        getGeneroRaltionSchipLoads();
        getDosisVaccinesLoads( token );
  }, [])
  
  return (
 
    <View style={styles.container}>
      <View style={[styles.card, { marginTop: 10, marginBottom: (Platform.OS==='ios') ? 40 : 0 }]}>
        {/* ` En CardsFigmaScreen aparece la tarjeta de (Consultas, Vacunacion, Embarazo, Patologias ) .` */}
           <CardsFigmaScreen/>
      </View>
      <View style={[styles.card, { marginTop: 0, marginBottom: 0 }]}>
         {/* ` En NextAppointmentsScreen aparece PROXIMAS CITAS */}
           <NextAppointmentsScreen/>
      </View>
      <View style={[styles.card, { marginTop: 10, marginBottom: 5 }]} >
        {/* ` En NextAppointmentsScreen aparece CUIDA TU SALUD */}
            <WatchYourHealthScreen/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 2,
  },
  card: {
    flex: 1,
    //backgroundColor: 'lightblue',
    borderRadius: 10,
  },
});
