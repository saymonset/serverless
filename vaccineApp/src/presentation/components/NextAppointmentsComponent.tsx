import React from 'react'
import { NextAppointments } from '../../infrastructure/interfaces/nextAppointments-interface';
import { Pressable, Platform, Dimensions, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;

interface Props {
    nextAppointments: NextAppointments;
}
export const NextAppointmentsComponent =  ( { nextAppointments } : Props) => {

    const appointmentDate = new Date(nextAppointments.date);
    const day = appointmentDate.getDate();
    const month = appointmentDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    const year = appointmentDate.getFullYear();
return (
<Pressable>
 <Layout style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <Layout style={ {...styles.icon,
                          marginLeft:(Platform.OS==='ios')?0:10}}>
            <Icon name={nextAppointments.icon} size={50} color={"black"} />
        </Layout>    
        <Layout style={{ marginLeft: 30 }}>
                <Text style={styles.date}>{ `${day}/${month}/${year}`}</Text>
               { (nextAppointments.hour) && <Text style={styles.blue}>{ nextAppointments.hour}</Text> }
                <Text style={styles.name}>{ nextAppointments.name}</Text>
                <Text style={styles.name}>{ nextAppointments.title + ' ' + nextAppointments.subTitle}</Text>
                <Text style={styles.name}></Text>
        </Layout>
        <Layout style={{ flex: 1 }}></Layout>
  </Layout>
</Pressable>

)
}


// 


const styles = StyleSheet.create({
cardContainer: {
    marginHorizontal: 10,
   marginBottom:10,
},
date: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
},
name: {
    color: 'black',
},
blue: {
    color: 'blue',
    fontWeight: 'bold',
},
icon: {
    left:0,
    top:0,
    justifyContent:'center', 
    alignItems:'center' ,
    width:60, 
    height:60,  
    borderRadius:10,
    backgroundColor:  'rgba(173, 216, 230, 0.2)'
},
 
});