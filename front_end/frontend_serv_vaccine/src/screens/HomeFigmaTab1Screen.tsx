import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { CardsFigmaScreen } from './CardsFigmaScreen';
import { NextAppointmentsScreen } from './NextAppointmentsScreen';
import { WatchYourHealthScreen } from './WatchYourHealthScreen';

export const HomeFigmaTab1Screen = () => {
  return (

    <View style={styles.container}>
      <View style={[styles.card, { marginTop: 10, marginBottom:  0 }]}>
           <CardsFigmaScreen/>
      </View>
      <View style={[styles.card, { marginTop: 10, marginBottom: 10 }]}>
           <NextAppointmentsScreen/>
      </View>
      <View style={[styles.card, { marginTop: 10, marginBottom: 5 }]} >
               <WatchYourHealthScreen/>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    flex: 1,
    //backgroundColor: 'lightblue',
    borderRadius: 10,
  },
});
