import React, { useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, CheckBox, Icon, Layout, Modal, Text, Tooltip } from '@ui-kitten/components';
import { Divider, List, ListItem } from '@ui-kitten/components';
import { useVaccines } from '../hooks/useVaccines';
import { Vaccine } from '../../domain/entities/VaccineDependent';
import { MyIcon } from './ui/MyIcon';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { QueryClient } from '@tanstack/react-query';
import { usePlanVaccines } from '../hooks/usePlanVaccines';

 
interface Props {
  onData: (item:any) => void;
  onClose ? : ( value: boolean ) => void;
  isVisible?: boolean;
  title?: string;
  dependentId: string;
}
 
export const PlanVaccinesDependentModal = ({ isVisible = false, title = '', onData, onClose, dependentId}:Props) => {
    const [visible, setVisible] = React.useState(isVisible);
    let [vaccine, setVaccine] = useState('');
 

    // Create a client
    const queryClient = new QueryClient()
   // Quitamos el cache de las dosis alseleccionar nueva vacuna
    queryClient.invalidateQueries({queryKey: ['dosis', 'infinite']});
     
   
    // const { vaccines:vaccsStates, isLoading, getVaccinesAll, getPlanVaccinesAll, 
    //    updatePlanVaccinesByDependent } = useVaccines();

    const { vaccines:vaccsStates, isLoading,  getPlanVaccinesAll, 
       updatePlanVaccinesByDependent } = usePlanVaccines();

    const [ vaccinesAux, setVaccinesAux ] = useState<Vaccine[]>([]);
    const [check, setCheck] = useState(false)
   

    const loadVaccines = async ()=>{
         await   getPlanVaccinesAll(dependentId);
    }
    useEffect(() => {
     // if (!vaccsStates || vaccsStates.length==0){
        loadVaccines();
       // setVaccinesAux(vaccsStates);
     // }
    }, []);

    useEffect(() => {
      setVaccinesAux(vaccsStates);
    }, [vaccsStates.length != 0]);

   
// Updated onVaccineCheckedChange function
const onVaccineCheckedChange = (name: string): void => {
  const updatedVaccines = vaccinesAux.map((vac: Vaccine) => {
    if (vac.name === name) {
      return { ...vac, isChecked: !vac.isChecked }; // Toggle the isChecked property
    }
    return vac;
  });
  setVaccinesAux(updatedVaccines); // Update the state with the new array of vaccines
};   
  
// Updated onVaccineCheckedChange function
const onVaccineChecked = (): void => {
  
  const planVaccinesByDependent = vaccinesAux.filter((vac: Vaccine) => vac.isChecked)
  .map((vac)=>vac._id.$oid);

      updatePlanVaccinesByDependent( dependentId , planVaccinesByDependent);

};


 

     
    const renderItem = ({ item }: { item:Vaccine; index: number }): React.ReactElement => (
      <>
       {  isLoading && (  <LoadingScreen />  )}
         <ListItem 
        style={  styles.itemTextRed }
        title={(evaProps) => (
          <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
               <CheckBox
                  style={styles.option}
                  checked={item.isChecked}
                  onChange={(isChecked)=>{
                    onVaccineCheckedChange(item.name);
                    setCheck(!check);
                  }}
                >
                  <>
                
                  <MyIcon name={'brush-outline'} />
                
                  <Layout style={{ flexDirection: 'row',  justifyContent:'flex-end' }}>
                
                    <Text style={{  marginLeft:10, color:  'blue'  }}>
                        { item.name}
                    </Text>
                  </Layout>
                  </>
                </CheckBox>
              
                
        
          </Layout>
       
        )}
        description=
        {(evaProps) => (
          <Layout style={{ flexDirection: 'row',  justifyContent:'flex-end' }}>
          <Text style={{  marginLeft:10, color:  'blue'  }}>
            {/* {item.description} */}
          </Text>
        </Layout>
       )}
        onPress={() => {
        //  setVaccine(item.name);
         // setVisible(false)
          //onData(item);
        }}
      />
      </>
      
    );
  return (
     <View style={styles.container}>
       
  
          <Text category='h6'>
                { vaccine && ` ${vaccine}`}
          </Text>
  
          <Button 
              status='basic'
              onPress={() => setVisible(true)}>
              <Text status='danger' category='h3'>Vacuna</Text>
          </Button>

          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
          >
            <Card 
                  header={<Text >{title}</Text>}
                disabled={true} 
                style={{  width:330, height:600}}>
            <List
                style={styles.container}
                data={vaccinesAux ?? []}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
              />
              
              <Layout style={{flexDirection:'row', alignItems:'center', marginBottom:30}}>

                  <Button 
                      status='success'
                      style={{marginHorizontal:20}} onPress={() => {
                      onVaccineChecked();
                  }}>
                    Aplicar
                  </Button>
                
                  <Button onPress={() => {
                        setVisible(false);
                        //Si existe el metodo, lanzamos verdadero
                        onClose && onClose(true);
                  }}>
                    Cerrar
                  </Button>
              </Layout>
            
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
    group: {
      marginVertical: 4,
    },
    option: {
      marginVertical: 4,
      marginHorizontal: 12,
    },
  });

  