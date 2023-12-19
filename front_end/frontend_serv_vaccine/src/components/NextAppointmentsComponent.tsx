import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NextAppointments } from '../interfaces/nextAppointments-interfaces';

const windowWidth = Dimensions.get('window').width;

interface Props {
    nextAppointments: NextAppointments;
}

export const NextAppointmentsComponent = ( { nextAppointments } : Props) => {

        const appointmentDate = new Date(nextAppointments.date);
        const day = appointmentDate.getDate();
        const month = appointmentDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
        const year = appointmentDate.getFullYear();
  return (
    <TouchableOpacity activeOpacity={0.9}>
     <View style={{ flexDirection: 'row', alignItems: 'left' }}>
            <View style={ {...styles.icon,
                              marginLeft:(Platform.OS==='ios')?0:10}}>
                <Icon name={nextAppointments.icon} size={20} color={"black"} />
            </View>    
            <View style={{ marginLeft: 30 }}>
                    <Text style={styles.date}>{ `${day}/${month}/${year}`}</Text>
                   { (nextAppointments.hour) && <Text style={styles.blue}>{ nextAppointments.hour}</Text> }
                    <Text style={styles.name}>{ nextAppointments.name}</Text>
                    <Text style={styles.name}>{ nextAppointments.title + ' ' + nextAppointments.subTitle}</Text>
                    <Text style={styles.name}></Text>
            </View>
            <View style={{ flex: 1 }}></View>
      </View>
    
  </TouchableOpacity>
  
  )
}


// 


const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
       marginBottom:10,
        // height: 120,
        // width: 160,
        // marginBottom: 25,
        // borderRadius: 10,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,

        // elevation: 5,

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
        top:0,
        justifyContent:'center', 
        alignItems:'center' ,
        width:30, 
        height:30,  
        borderRadius:10,
        backgroundColor:  'rgba(173, 216, 230, 0.2)'
    },
     
});