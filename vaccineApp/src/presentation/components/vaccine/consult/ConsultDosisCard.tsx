import React, { useEffect } from 'react';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
 
import { NavigationProp, useNavigation } from '@react-navigation/native';
 
 
 
import { StyleSheet, View, ViewProps } from 'react-native';
 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApplyVaccine } from '../../../../domain/entities/ConsultByIndependentEntity';
import { VaccineStatus } from '../../../../infrastructure/interfaces/vaccine.status';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { stylesFigma } from '../../../screens/theme/appFigmaTheme';
import { useVaccines } from '../../../hooks/useVaccines';
 


interface Props {
    applyVaccine: ApplyVaccine;
}


 
export const ConsultDosisCard = ( { applyVaccine }:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {   isShowDosis, getShowDosis, getOffDosis } = useVaccines();

  useEffect(() => {
    getOffDosis();
  }, [])

  const goPageChange = () => {
  
     getShowDosis()
  } 

  return (
    <Layout  style={{flex:1}}>
                                     <Card 
                                       style={{flex:1}}
                                       onPress = { goPageChange }
                                        header={() =>  <Text></Text>}
                                      >
                                              <Text
                                                  numberOfLines={ 2 }
                                                  style ={{ textAlign:'left'}}
                                              >Dosis: { applyVaccine.dosis.name  }</Text>
                                              <Text style={stylesFigma.titlesecund}>
                                                Lote:{'' + (applyVaccine.lote)}</Text>
                                                <Text style={stylesFigma.titlesecund}>
                                                Fecha:{'' + (applyVaccine.vaccination_date)}</Text>
                                                <Text style={stylesFigma.titlesecund}>
                                                Frecuencia:{'' + (applyVaccine.dosis.age_frequency)}</Text>
                                                <Text style={stylesFigma.titlesecund}>
                                                Imagen:{'' + (applyVaccine.image)}</Text>
 
                                      </Card> 
    </Layout>
  )
}



const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});