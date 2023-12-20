import React from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNextAppointments } from '../hooks/useNextAppointments';
import { WatchYourHealthComponent } from '../components/WatchYourHealthComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export const WatchYourHealthScreen = () => {
    const { top } = useSafeAreaInsets();

    const { nextAppointments, isLoading } = useNextAppointments();
    let keyCounter = 0;
    const navigation = useNavigation();
    const search = ()=> {
      navigation.navigate( 'SearchScreen' as never)
    }
  return (
    <View style = {{ ... styles.globalMargin,
                        }}>

                 
                          
                <View style={{flexDirection:'row',  
                            justifyContent: 'center',
                            alignItems:'center'
                            
                             }}>
                    <Text style = {{ fontSize:25, 
                              fontWeight:'bold',
                              alignSelf: 'center',
                              //left:-30,
                              marginBottom: 0,
                              marginHorizontal:0}}>Cuida tu salud</Text>
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
                      horizontal={true}
                      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgray'}} />}
                      renderItem={({ item }) => (
                        <View style={{ flex:1, 
                                      marginBottom:0,
                                      backgroundColor:'white',
                                      justifyContent:'center',
                                      alignItems:'center',
                                      marginTop:0}}>
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