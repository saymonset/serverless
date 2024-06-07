import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components';
import { MainLayout } from '../../../layouts/MainLayout';
import { useVaccines } from '../../../hooks/useVaccines';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { Vaccine } from '../../../../domain/entities/VaccineDependent';
import { VaccinesModal } from '../../../components/VaccinesModal';

export const ConfigDosisModalScreen = () =>  {

    const [visible, setVisible] = React.useState(false);
    const {  isLoading, getVaccinesAll} = useVaccines();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const [idVaccine, setIdVaccine] = useState('');
    
    //Vamos a cargar dosis por el tipo de vacuna
    useEffect(() => {
      if (idVaccine!=''){
        navigation.navigate( 'DosisFigmaScreen' ,{ vaccineId: idVaccine})
      }
      setIdVaccine('')
    }, [idVaccine]);

    useEffect(() => {
      loadVaccines();
    }, [])
    

    const loadVaccines = async ()=>{
      let term:string = "''";
         await   getVaccinesAll(term);
    }

    const onVaccine = (value:Vaccine) =>{
      setIdVaccine(value._id.$oid);
    }

    const handleClose = (isClose: boolean) =>{
    }



  
    return (
      <MainLayout
          title="Seleccione vacuna de las dosis"
          subTitle=""
          >
          <Layout
            style={styles.container}
            level='1'
          >
                <VaccinesModal 
                    highButtonVaccine
                    isVisible
                    title='Seleccione la vacuna'
                    onClose = { ( value ) => handleClose( value )}
                    onData={(value) =>{
                      onVaccine(value);
                }}></VaccinesModal>
          </Layout>
      </MainLayout>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      minHeight: 192,
    },
  });
  