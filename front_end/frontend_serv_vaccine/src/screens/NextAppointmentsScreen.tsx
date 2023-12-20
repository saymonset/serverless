import React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNextAppointments } from '../hooks/useNextAppointments';
import { NextAppointmentsComponent } from '../components/NextAppointmentsComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const NextAppointmentsScreen = () => {
    let keyCounter = 0;

    const { top } = useSafeAreaInsets();

    const { nextAppointments, isLoading } = useNextAppointments();

    const navigation = useNavigation();

    const search = ()=> {
           navigation.navigate( 'SearchScreen' as never)
    }

  return (
    <View style = {{ ... styles.globalMargin,
                         alignItems:'center',
                         flex:1, 
                         backgroundColor:'white'}}>
              
                      <View style={{
                                    ...styles.search
                                    }}>
                            <Text style = {{ fontSize:25, 
                                      fontWeight:'bold',
                                  
                                      alignSelf: 'center',
                                      //left:-30,
                                      marginBottom: 0,
                                      marginHorizontal:0}}>Próximas citas</Text>
                            <View style = {{ flex: 1 }} />
                            {/* Flecha de busqueda */}
                            <TouchableOpacity 
                                  onPress={()=> search()}
                                  activeOpacity={0.9}>
                                  <Icon
                                      name = "chevron-forward-outline"
                                      color = "blue"
                                      size = { 23 }
                                  />
                             </TouchableOpacity>     
                      </View> 
                    
                        
               
               <FlatList
                      data={nextAppointments}
                      keyExtractor={() => {
                        keyCounter++;
                        return keyCounter.toString();
                      }}
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
    marginHorizontal: 0,
    alignItems:'center',
    justifyContent:'center',
    flex:1, 
    backgroundColor:'white'
  },
  title: {
      fontSize: 35,
      fontWeight: 'bold'
  },
  search: {
    flexDirection:'row',  
    justifyContent: 'center',
    alignItems:'center',
    fontSize: 35,
    color:'blue',
    fontWeight: 'bold'
}
});



//const styles = StyleSheet.create({
//   container: {
//       flexDirection: 'row'
//   },
//   itemText: {
//       marginLeft: 10,
//       fontSize: 19,
//       color: 'white',
//   }
// })