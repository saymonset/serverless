import React, { useEffect, useState } from 'react'
import { Alert, ImageProps, StyleSheet } from 'react-native';
import { Avatar, Button, Card, Layout, Modal, Text } from '@ui-kitten/components';
import { Divider, List, ListItem } from '@ui-kitten/components';
import { useApplyVaccine } from '../hooks/useApplyVaccine';
import { Dosi } from '../../domain/entities/apply-vaccine-interface';
import { MyIcon } from './ui/MyIcon';

 
interface Props {
  onData: (item:any) => void;
  vaccineId: string;
  dependentId: string;
}
 
export const DosisModal = ({onData, vaccineId, dependentId}:Props) => {
    const [visible, setVisible] = React.useState(false);
    const [dosis, setDosis] = useState('');
    const { dosis:dosisList, isLoading, getDosis } = useApplyVaccine();
    
    useEffect(() => {
      getDosis(vaccineId, dependentId);  
    
    }, [vaccineId, dependentId])
    
   
    // const ItemImage = (props: ImageProps): React.ReactElement => (
    //   <Avatar
    //     {...props}
    //     style={[props.style]}
    //     source={require('../../assets/icon.png')}
    //   />
    // );

  //   <Text style={{ color: item.isAlertApply ? 'red' : 'black' }}>
  //   {item.name}
  // </Text>
  
 
  
    const renderItem = ({ item }: { item:Dosi; index: number }): React.ReactElement => (
      <ListItem
        style={!item.isApplied ? styles.itemTextRed : styles.itemText}
        accessoryLeft={  item.isApplied ? <MyIcon name={'checkmark-outline'}/> : <MyIcon name={'shield-off-outline'}/> }
        title={(evaProps) => (
          <Text style={{ color: item.isApplied ? 'gray' : 'black' }}>
              {item.name}
          </Text>
        )}
        description={`${item.isApplied ? item.lote:''}`}
        onPress={() => {
          if (!item.isApplied) {
            setDosis(`${item.name} ${item.lote}`);
            setVisible(false);
            onData(item);
          }else{
            Alert.alert("Info","L vacuna ya fue aplicda.")
          }
        }}
      />
    );
  return (
    <Layout style={styles.container}>
    <Text category='h6'>
          { dosis && ` ${dosis}`}
    </Text>
    <Button 
        status='basic'
        onPress={() => setVisible(true)}>
      Dosis
    </Button>

    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}
    >
      <Card disabled={true} style={{width:330, height:300}}>
      <List
          style={styles.container}
          data={dosisList ?? []}
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
  });