import { Icon, Layout, Text } from '@ui-kitten/components';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, Platform, Pressable, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { Vaccine } from '../../../../domain/entities/VaccineEditCreateEntity';
 
interface Props {
    vaccine: Vaccine;
    onDelete? : (idRow: string)=> void;
}

export const VaccineConsultDeleteCard = ({ vaccine , onDelete}:Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
 

  return (
    <>
        <Layout style={{ flexDirection: 'row', alignItems: 'flex-start' ,marginHorizontal:30  }}>
            <Pressable
                                  onPress = { () => navigation.navigate('VaccineEditCreateScreen',{ vaccineId: vaccine._id.$oid})}
                                >
                  <Layout style={{ flexDirection: 'column',  marginHorizontal:10}}>
                      
                              <Layout style={{ marginLeft: 10 }}> 
                              
                                    <Text style={styles.strong}>{ vaccine.name }</Text>
                              
                              </Layout>
                                <Layout style={{ marginLeft: 30 }}> 
                                
                                      <Text style={styles.name}>{vaccine.description}</Text>
                                  
                                </Layout>
                            
                                
                    </Layout>
            </Pressable>
              
              {/* <Layout style={{  marginRight:(Platform.OS==='ios')?20:20}}> */}
              <Layout style={{ marginRight: 0 }}> 
                                  <Pressable
                                        onPress = { () =>  onDelete && onDelete(vaccine._id.$oid)}
                                      >
                                    <Ionicons name="trash" size={20} color="red" />
                                  </Pressable>
                            </Layout>
              {/* </Layout> */}
        </Layout>
        <Layout style={{height:9}}></Layout>
    </>
  )
}

 
const styles = StyleSheet.create({
   
    strong: {
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
        top:0,
        justifyContent:'center', 
        alignItems:'center' ,
        width:60, 
        height:60,  
        borderRadius:10,
        backgroundColor:  'rgba(173, 216, 230, 0.2)'
    },
     
});

 