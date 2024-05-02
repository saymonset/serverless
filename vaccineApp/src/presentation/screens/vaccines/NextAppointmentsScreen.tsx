import { useNavigation } from '@react-navigation/native';
import { Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { FlatList, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NextAppointmentsComponent } from '../../components/NextAppointmentsComponent';
import { useNextAppointments } from '../../hooks/useNextAppointments';

export const NextAppointmentsScreen = () => {

  let keyCounter = 0;


  const { nextAppointments } = useNextAppointments();

  const navigation = useNavigation();

  const search = ()=> {
         navigation.navigate( 'SearchScreen' as never)
  }
  return (
    <Layout style = {{ ... styles.globalMargin,
      alignItems:'center',
      flex:1, 
      backgroundColor:'white'}}>

   <Layout style={{
                 ...styles.search
                 }}>
         <Text style = {{ fontSize:25, 
                   fontWeight:'bold',
               
                   alignSelf: 'center',
                   //left:-30,
                   marginBottom: 0,
                   marginHorizontal:0}}>Próximas citas</Text>
         <Layout style = {{ flex: 1 }} />
         {/* Flecha de busqueda */}
         <Pressable 
               onPress={()=> search()}
              >
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
   numColumns={1}
   horizontal={false}
   ItemSeparatorComponent={() => <Layout style={{ height: 1, backgroundColor: 'lightgray'}} />}
   renderItem={({ item }) => (
     <Layout style={{marginBottom:10,
                   marginTop:5}}>
       <NextAppointmentsComponent nextAppointments={item} />
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