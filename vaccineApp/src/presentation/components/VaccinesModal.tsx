import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { Divider, List, ListItem } from '@ui-kitten/components';
import { useVaccines } from '../hooks/useVaccines';
import { Vaccine } from '../../domain/entities/VaccineDependent';

 
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
          <Text style={{ color: item.isAlertApply ? 'red' : 'black' }}>
            {item.name}
          </Text>
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
        <Text status='danger' category='h3'>Vacunacc</Text>
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