import React, { useEffect } from 'react';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ViewProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PagesScreenStatus, PagesVaccineScreenStatus } from '../../../../infrastructure/interfaces/screens.status';
import { Dependent } from '../../../../infrastructure/interfaces/dependent-interface';
import { useVaccines } from '../../../hooks/useVaccines';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { stylesFigma } from '../../../screens/theme/appFigmaTheme';
import { DosisEntity, Vaccine } from '../../../../domain/entities/VaccineEditCreateEntity';


interface Props {
    goPage: PagesVaccineScreenStatus;
    dosis: DosisEntity;
}


export const CreateEditDosisCard = ( { dosis, goPage = 'DosisEditCreateScreen' }:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {   putNameVaccineSelect } = useVaccines();

    //Este nombre se coloca apenas selecciones un dosis de la vacuna 
    useEffect(() => {
    
      putNameVaccineSelect(dosis.vaccineName ?? '');
 }, [dosis.vaccineName])

  return (
    <Layout  style={{flex:1}}>
      {(goPage==='DosisEditCreateScreen') && <Card 
                                    
                                      style={{flex:1}}
                                          onPress = { () => {
                                            navigation.navigate('DosisEditCreateScreen',{ dosisId:  dosis._id.$oid});
                                          //  console.log( vaccine._id.$oid );
                                          }}
                                      >
                                           <Text category='h6'>
                                                 {dosis.vaccineName ?? ''}
                                            </Text>
                                            <Text category='s1'>
                                                { dosis.age_frequency  }
                                            </Text>
                                           
                                          
                                      </Card>
                                      
                                      
                                      
                                      }
 
                                     
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