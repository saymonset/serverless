import React from 'react'
 
import { Dimensions, StyleSheet, Pressable, Platform } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/Ionicons';
import { NextAppointments } from '../../infrastructure/interfaces/nextAppointments-interface';
const windowWidth = Dimensions.get('window').width;

interface Props {
    nextAppointments: NextAppointments;
}

export const WatchYourHealthComponent = ({ nextAppointments } : Props) => {
    const appointmentDate = new Date(nextAppointments.date);
    const day = appointmentDate.getDate();
    const month = appointmentDate.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    const year = appointmentDate.getFullYear();
  return (
    <Layout style={ {...styles.cardContainer}}>
            <Pressable>
        
                    <Layout style={ {...styles.icon,
                                    marginLeft:(Platform.OS==='ios')?0:0,
                                    top: (Platform.OS==='ios')?10:0
                                    }}>
                                <Icon name={nextAppointments.icon} size={50} color={"black"} />
                    
                    </Layout>
                    <Layout>
                            <Text style={styles.date}>{ `${day}/${month}/${year}`}</Text>
                        { (nextAppointments.hour) && <Text style={styles.blue}>{ nextAppointments.hour}</Text> }
                            <Text >{ nextAppointments.name}</Text>
                            <Text>{ nextAppointments.title + ' ' + nextAppointments.subTitle}</Text>
                            <Text></Text>
                    </Layout>
        </Pressable>
  </Layout>
  )
}


const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor:'rgba(182, 149, 192, 0.1)',
        marginVertical:0,
        marginRight:5,
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    date: {
        color: 'black',
        fontSize: 14,
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
        width:60, 
        height:60,  
        borderRadius:10,
        backgroundColor:  'rgba(173, 216, 230, 0.2)'
    },
     
});