import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNextAppointments } from '../hooks/useNextAppointments';
import { NextAppointmentsComponent } from '../components/NextAppointmentsComponent';
import { WatchYourHealthComponent } from '../components/WatchYourHealthComponent';

export const WatchYourHealthScreen = () => {
    const { top } = useSafeAreaInsets();

    const { nextAppointments, isLoading } = useNextAppointments();
    let keyCounter = 0;
  return (
    <View style = {{ ... styles.globalMargin,
                        }}>
               <Text style = {{ fontSize:35, 
                        fontWeight:'bold',
                        //left:-30,
                        marginBottom: 0,
                        marginHorizontal:2}}>Cuida tu salud</Text>
               <FlatList
                      data={nextAppointments}
                      keyExtractor={() => {
                        keyCounter++;
                        return keyCounter.toString();
                      }}
                      showsHorizontalScrollIndicator={true}
                      horizontal={true}
                      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgray'}} />}
                      renderItem={({ item }) => (
                        <View style={{ flex:1, 
                                      marginBottom:10,
                                      backgroundColor:'white',
                                      marginTop:5}}>
                          <WatchYourHealthComponent nextAppointments={item} />
                        </View>
                      )}
                    />

    </View>
  )
}

 
export const styles = StyleSheet.create({
  globalMargin: {
      marginHorizontal: 0,
      alignItems:'center',
      justifyContent:'center',
      flex:1, 
      backgroundColor:'white'
  },
  title: {
      fontSize: 35,
      fontWeight: 'bold'
  }
});