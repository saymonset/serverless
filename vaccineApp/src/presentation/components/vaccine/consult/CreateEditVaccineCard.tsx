import React, { FC } from 'react';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ViewProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PagesScreenStatus, PagesVaccineScreenStatus } from '../../../../infrastructure/interfaces/screens.status';
import { Dependent } from '../../../../infrastructure/interfaces/dependent-interface';
import { useVaccines } from '../../../hooks/useVaccines';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { stylesFigma } from '../../../screens/theme/appFigmaTheme';
import { Vaccine } from '../../../../domain/entities/VaccineEditCreateEntity';
import { VaccineConsultDeleteCard } from './VaccineConsultDeleteCard';


interface Props {
    goPage: PagesVaccineScreenStatus;
    vaccine: Vaccine;
    onDelete: (id:string) => void;
}

 

export const CreateEditVaccineCard:FC<Props> = ( { vaccine, goPage = 'VaccineEditCreateScreen', onDelete }:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {   getVaccines } = useVaccines();
 

  return (
    <Layout  style={{flex:1}}>

      {(goPage==='VaccineEditCreateScreen') && <VaccineConsultDeleteCard
                                                  onDelete = { onDelete}
                                                  vaccine = { vaccine }
                                                 />}
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