import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { WatchYourHealthComponent } from '../../components/WatchYourHealthComponent';
import { useNextAppointments } from '../../hooks/useNextAppointments';

export default function WatchYourHealthScreen() {
  const { top } = useSafeAreaInsets();

  const { nextAppointments, isLoading } = useNextAppointments();
  let keyCounter = 0;
  const navigation = useNavigation();
  const search = ()=> {
    navigation.navigate( 'SearchScreen' as never)
  }
  return (
    <Layout style = {{ ... styles.globalMargin,
    }}>


      
<Layout style={{flexDirection:'row',  
        justifyContent: 'center',
        alignItems:'center'
        
         }}>
<Text style = {{ fontSize:25, 
          fontWeight:'bold',
          alignSelf: 'center',
          //left:-30,
          marginBottom: 0,
          marginHorizontal:0}}>Cuida tu salud</Text>
<Layout style = {{ flex: 1 }} />

 {/* Flecha de busqueda */}
 <Pressable 
              onPress={()=> search()}>
               <Icon
                    name = "chevron-forward-outline"
                    color = "blue"
                    size = { 23 }
                />
         </Pressable>   
</Layout>          
<FlatList
  data={nextAppointments}
  keyExtractor={() => {
    keyCounter++;
    return keyCounter.toString();
  }}
  showsHorizontalScrollIndicator={true}
  horizontal={true}
  ItemSeparatorComponent={() => <Layout style={{ height: 1, backgroundColor: 'lightgray'}} />}
  renderItem={({ item }) => (
    <Layout style={{ flex:1, 
                  marginBottom:0,
                  backgroundColor:'white',
                  justifyContent:'center',
                  alignItems:'center',
                  marginTop:0}}>
      <WatchYourHealthComponent nextAppointments={item} />
    </Layout>
  )}
/>

</Layout>
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