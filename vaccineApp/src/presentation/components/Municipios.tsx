import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';
import { usePaises } from '../hooks/usePaises';

import { Divider, List, ListItem } from '@ui-kitten/components';

interface IListItem {
  capital: string, 
  id_estado: number, 
  municipios:[], 
  estado: string
}

interface Props {
  idEstado:number;
  onData: (item:any) => void;
}
 
export const Municipios = ({onData, idEstado = 0}:Props) => {
    const [visible, setVisible] = React.useState(false);
    const { municipiosOfEstadosOfVenezuela } = usePaises(); 
    const [municipio, setMunicipio] = useState('');
   
    

    const renderItem = ({ item }: { item:IListItem; index: number }): React.ReactElement => (
      <ListItem
        title={`${item.capital}`}
        description={``}
        onPress={() => {
          setMunicipio(`${item.capital}`);
          setVisible(false)
          onData(item);
        }}
      />
    );

    
  return (
  
    <Layout style={styles.container}>
       
        <Button 
         status='basic'
         onPress={() => {

          if (idEstado === 0) {
            return null; // Return null when idEstado is 0 to render an empty jsx
          }
          //Hacemos visible el modal
          setVisible(true);
         }}>
          Municipio
        </Button>

        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card disabled={true} style={{width:330, height:300}}>
          <List
              style={styles.container}
              data={municipiosOfEstadosOfVenezuela(idEstado)[0]?.municipios || [] }
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
            <Button onPress={() => setVisible(false)}>
              Cerrar
            </Button>
          </Card>
        </Modal>

  </Layout>
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