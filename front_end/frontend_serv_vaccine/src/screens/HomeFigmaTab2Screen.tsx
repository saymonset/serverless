import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { PerfilesFigmaScreen } from './PerfilesFigmaScreen';




export const HomeFigmaTab2Screen = () => {
  const {  getGeneroRaltionSchipLoads } = useContext(AuthContext);

  useEffect(() => {
    getGeneroRaltionSchipLoads();
  }, [])
  return (
  
  
    

    <View style={styles.container}>
      <View style={[styles.card, { marginTop: 10, marginBottom: (Platform.OS==='ios') ? 40 : 0 }]}>
      <PerfilesFigmaScreen/>
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