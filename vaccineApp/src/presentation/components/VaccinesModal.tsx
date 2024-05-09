import React, { useState } from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';
import { Divider, List, ListItem } from '@ui-kitten/components';
import { useVaccines } from '../hooks/useVaccines';
import { Vaccine } from '../../domain/entities/VaccineDependent';
import { MyIcon } from './ui/MyIcon';

 
interface Props {
  onData: (item:any) => void;
}
 
export const VaccinesModal = ({onData}:Props) => {
    const [visible, setVisible] = React.useState(false);
     
    const [estado, setEstado] = useState('');
    const { vaccines, isLoading } = useVaccines();
   
     
    const renderItem = ({ item }: { item:Vaccine; index: number }): React.ReactElement => (
      <ListItem 
        style={  styles.itemTextRed }
        title={(evaProps) => (
          <Layout style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.isAlertApply && 
           <Pressable onPress={() => { return Alert.alert('Info', 'Hola Mundo')}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {item.isAlertApply && <MyIcon name={'bell-outline'} />}
              <Text style={{ color: item.isAlertApply ? 'black' : 'black', marginLeft: 10 }}>
                {item.name}
              </Text>
            </View>
         </Pressable>}
          </Layout>
       
        )}
        description={`${item.description}`}
        onPress={() => {
          setEstado(`${item.name}-${item.description}`);
          setVisible(false)
          onData(item);
        }}
      />
    );
  return (
    <View style={styles.container}>
    <Text category='h6'>
          { estado && ` ${estado}`}
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
      <Card disabled={true} style={{width:330, height:300}}>
      <List
          style={styles.container}
          data={vaccines ?? []}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
        <Button onPress={() => setVisible(false)}>
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
    }
  });