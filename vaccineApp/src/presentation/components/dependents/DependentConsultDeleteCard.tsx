import { Icon, Layout, Text } from '@ui-kitten/components';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, Platform, Pressable, StyleSheet } from 'react-native';
import { Dependent } from '../../../infrastructure/interfaces/dependent-interface';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useDependent } from '../../hooks/useDependent';
import { useQueryClient } from '@tanstack/react-query';
 
interface Props {
    dependent: Dependent;
    onDeleteRow? : (idRow: string)=> void;
}

export const DependentConsultDeleteCard = ({ dependent , onDeleteRow}:Props) => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
 
    const queryClient = useQueryClient();
    



  

  return (
    <Layout style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
       
       <Pressable
                 onPress = { () => navigation.navigate('DependentAddEditScreen',{ dependentId: dependent._id.$oid})}
               >
                  <Layout style={{ flexDirection: 'row'}}>
                      <Layout style={ {...styles.icon,
                                        marginLeft:(Platform.OS==='ios')?0:10}}>
                          <Ionicons name='person-outline' size={20} color={"black"} />
                          
                      </Layout>    
                      <Layout style={{ marginLeft: 30 }}>
                              <Text style={styles.strong}>{ dependent.name + ' ' + dependent.lastname}</Text>
                              <Text style={styles.name}>{'Perfil ' + (dependent.isUser?'Primario':'Secundario')}</Text>
                      </Layout>
                  </Layout>
            </Pressable>
       <Layout style={{ flex: 1, marginHorizontal:0}}></Layout>
            <Layout style={{  marginRight:(Platform.OS==='ios')?20:20}}>
                <Pressable onPress={
                              () => {
                                onDeleteRow && onDeleteRow(dependent._id.$oid) ;
                              }
                              }>
                      {dependent.isUser ? <></>:<Ionicons name="trash" size={20} color="red" />} 
                </Pressable>
            </Layout>
    </Layout>
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

 