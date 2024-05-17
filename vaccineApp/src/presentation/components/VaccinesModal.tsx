import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Modal, Text, Tooltip } from '@ui-kitten/components';
import { Divider, List, ListItem } from '@ui-kitten/components';
import { useVaccines } from '../hooks/useVaccines';
import { Vaccine } from '../../domain/entities/VaccineDependent';
import { MyIcon } from './ui/MyIcon';

 
interface Props {
  onData: (item:any) => void;
  onClose ? : ( value: boolean ) => void;
  isVisible?: boolean;
  title?: string;
}
 
export const VaccinesModal = ({ isVisible = false, title = '', onData, onClose}:Props) => {
    const [visible, setVisible] = React.useState(isVisible);
    const [vaccine, setVaccine] = useState('');
     
   
    const { vaccines, isLoading } = useVaccines();
   

const placements = [
  'top',
  'top start',
  'top end',
  'bottom',
  'bottom start',
  'bottom end',
  'left',
  'left start',
  'left end',
  'right',
  'right start',
  'right end',
];

     
    const renderItem = ({ item }: { item:Vaccine; index: number }): React.ReactElement => (
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
         <Text style={{ color: item.isAlertApply ? 'black' : 'black', marginLeft: 10 }}>
                {item.name}
              </Text>
         {/* Si no a sido aplicada */}
         {!item.isAlertApply && 
            <Layout style={styles.containerText}>
                <Text style={{ color: item.isAlertApply ? 'black' : 'black', marginLeft: 10 }}>
                  {item.name}
                </Text>
            </Layout>
        }
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
           style={{  width:330, height:300}}>
      <List
          style={styles.container}
          data={vaccines ?? []}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
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