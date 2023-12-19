import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NextAppointments } from '../interfaces/nextAppointments-interfaces';

const windowWidth = Dimensions.get('window').width;

interface Props {
    nextAppointments: NextAppointments;
}

export const WatchYourHealthComponent = ( { nextAppointments } : Props) => {

        const appointmentDate = new Date(nextAppointments.date);
        const day = appointmentDate.getDate();
        const month = appointmentDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
        const year = appointmentDate.getFullYear();
  return (
    <View style={ {...styles.cardContainer}}>
    <TouchableOpacity activeOpacity={0.9}>
  
            <View style={ {...styles.icon,
                              marginLeft:(Platform.OS==='ios')?0:0}}>
                        <Icon name={nextAppointments.icon} size={20} color={"black"} />
            
            </View>
            <View>
                    <Text style={styles.date}>{ `${day}/${month}/${year}`}</Text>
                   { (nextAppointments.hour) && <Text style={styles.blue}>{ nextAppointments.hour}</Text> }
                    <Text >{ nextAppointments.name}</Text>
                    <Text>{ nextAppointments.title + ' ' + nextAppointments.subTitle}</Text>
                    <Text></Text>
            </View>
          
     
    
  </TouchableOpacity>
  </View>
  
  )
}


// 


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor:'rgba(182, 149, 192, 0.1)',
        marginVertical:0,
        marginHorizontal:5,
        flex:1,
    },
    date: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
       // left: 20
    },
    name: {
        color: 'black',
       // fontSize: 20,
       // fontWeight: 'bold',
      //  left: 20
    },
    blue: {
        color: 'blue',
       // fontSize: 20,
        fontWeight: 'bold',
      //  left: 20
    },
    icon: {
        left:0,
        top:10,
        marginBottom:10,
        justifyContent:'flex-start', 
        alignItems:'flex-start' ,
        width:30, 
        height:30,  
        borderRadius:10,
        backgroundColor:  'rgba(173, 216, 230, 0.2)'
    },
     
});