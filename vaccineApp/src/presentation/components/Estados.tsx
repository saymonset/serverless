import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { usePaises } from '../hooks/usePaises';

import { Divider, List, ListItem } from '@ui-kitten/components';

interface IListItem {
  capital: string, 
  id_estado: number, 
  municipios:[], 
  estado: string
}

interface Props {
  onData: (item:any) => void;
}
 
export const Estados = ({onData}:Props) => {
    const [visible, setVisible] = React.useState(false);
    const { estadosOfVenezuela } = usePaises(); 
    const [estado, setEstado] = useState('');
   
    

    const renderItem = ({ item }: { item:IListItem; index: number }): React.ReactElement => (
      <ListItem
        title={`${item.capital}`}
        description={`${item.estado}`}
        onPress={() => {
          setEstado(`${item.capital}-${item.estado}`);
          setVisible(false)
          onData(item);
        }}
      />
    );
  return (
    <View style={styles.container}>
    {/* <Text category='h6'>
          { estado && ` ${estado}`}
    </Text> */}
    <Button 
        status='basic'
        onPress={() => setVisible(true)}>
      Estado
    </Button>

    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card disabled={true} style={{width:330, height:300}}>
      <List
          style={styles.container}
          data={estadosOfVenezuela() ?? []}
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
  });