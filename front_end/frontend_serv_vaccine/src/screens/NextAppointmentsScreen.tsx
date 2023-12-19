import React from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNextAppointments } from '../hooks/useNextAppointments';
import { NextAppointmentsComponent } from '../components/NextAppointmentsComponent';

export const NextAppointmentsScreen = () => {
    const { top } = useSafeAreaInsets();

    const { nextAppointments, isLoading } = useNextAppointments();

  return (
    <View style = {{ ... styles.globalMargin,
                         alignItems:'center',
                         flex:1, 
                         backgroundColor:'white'}}>
               <Text style = {{ fontSize:35, 
                        fontWeight:'bold',
                        //left:-30,
                        marginBottom: top,
                        marginHorizontal:10}}>Próximas citas</Text>
               <FlatList
                      data={nextAppointments}
                      keyExtractor={(obj) => obj.date}
                      showsHorizontalScrollIndicator={true}
                      numColumns={1}
                      horizontal={false}
                      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgray'}} />}
                      renderItem={({ item }) => (
                        <View style={{marginBottom:10,
                                      marginTop:5}}>
                          <NextAppointmentsComponent nextAppointments={item} />
                        </View>
                      )}
                    />

    </View>
  )
}

 
export const styles = StyleSheet.create({
  globalMargin: {
      marginHorizontal: 0
  },
  title: {
      fontSize: 35,
      fontWeight: 'bold'
  }
});