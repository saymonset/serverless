import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Modal, Text, Tooltip } from '@ui-kitten/components';
import { Divider, List, ListItem } from '@ui-kitten/components';
import { useVaccines } from '../hooks/useVaccines';
import { Vaccine } from '../../domain/entities/VaccineDependent';
import { MyIcon } from './ui/MyIcon';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { QueryClient } from '@tanstack/react-query';
import { usePlanVaccines } from '../hooks/usePlanVaccines';
import { MainLayout } from '../layouts/MainLayout';
import { SearchInputComponent } from './SearchInputComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

 
interface Props {
  onData: (item:any) => void;
  onClose ? : ( value: boolean ) => void;
  isVisible?: boolean;
  title?: string;
  vaccines: Vaccine[];
}


const screenWidth = Dimensions.get("window").width;

export const PlanVaccinesModal = ({ isVisible = false, title = '', onData, onClose, vaccines}:Props) => {
    const [visible, setVisible] = React.useState(isVisible);
    const [vaccine, setVaccine] = useState('');
    const { top } = useSafeAreaInsets();
    const [ term, setTerm ] = useState('');
    // const { vaccines, isLoading, vaccineFilter } = usePlanVaccines();
    // const {   getVaccines } = useVaccines();

    


 

 

   
 
      
 

  


 
    // Create a client
    const queryClient = new QueryClient()
   // Quitamos el cache de las dosis alseleccionar nueva vacuna
    queryClient.invalidateQueries({queryKey: ['dosis', 'infinite']});
     
   

 
 
   
 

     
    const renderItem = ({ item }: { item:Vaccine; index: number }): React.ReactElement => (
      <>
      

         <ListItem 
        style={  styles.itemTextRed }
        title={(evaProps) => (
          <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.isAlertApply && 
           <Pressable onPress={() => {  Alert.alert('Warnings', 'Mantén al día tu calendario de vacunación para protegerte a ti y a quienes te rodean, ¡cuidémonos juntos!')}}>
            <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.isAlertApply && <MyIcon name={'bell-outline'} />}
             
            </Layout>
         </Pressable>}
         <Text style={{ color: item.isAlertApply ? 'red' : 'black', marginLeft: 10 }}>
                {item.name}
              </Text>
          </Layout>
       
        )}
        description=
        {(evaProps) => (
          <Layout style={{ flexDirection: 'row',  justifyContent:'flex-end' }}>
          <Text style={{  marginLeft:10, color:  'blue'  }}>
            {item.description}
          </Text>
        </Layout>
       )}
        onPress={() => {
          setVaccine(item.name);
          setVisible(false)
          onData(item);
        }}
      />
      </>
      
    );
  return (

   
        <View style={styles.container}>
           <Modal
                  visible={visible}
                  backdropStyle={styles.backdrop}
                  onBackdropPress={() => setVisible(false)}
                >
                      <Text category='h6'>
                            { vaccine && ` ${vaccine}`}
                      </Text>

                      <Button 
                          status='basic'
                          onPress={() => setVisible(true)}>
                          <Text status='danger' category='h3'>Vacuna</Text>
                      </Button>

                    
                        <Card 
                              header={<Text >{title}</Text>}
                            disabled={true} 
                            style={{  width:330, height:600}}>
                              

                         <Layout style={{height:30}}></Layout>

                       
                         {   (  <List
                                                    style={styles.container}
                                                    data={ vaccines || [] }
                                                    ItemSeparatorComponent={Divider}
                                                    renderItem={renderItem}
                                                  /> )}
                        




                          <Button onPress={() => {
                              setVisible(false);
                              //Si existe el metodo, lanzamos verdadero
                              onClose && onClose(true);

                          }}>
                            Cerrar
                          </Button>
                        </Card>
                        
                        </Modal>                  
        </View>
     
     
  
  )
}


const styles = StyleSheet.create({
    container: {
      minHeight: 10,
    },
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    itemText: {
        marginLeft: 10,
        fontSize: 19,
        color: 'black',
    },
    itemTextRed: {
        marginLeft: 10,
        fontSize: 19,
        color: 'red',
    },
    containerText: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: 'color-success-default',
    },
  });