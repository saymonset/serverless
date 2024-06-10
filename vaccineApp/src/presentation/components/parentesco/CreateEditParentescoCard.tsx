import React, { FC } from 'react';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useVaccines } from '../../hooks/useVaccines';
import { RootStackParams } from '../../navigation/StackNavigator';
import { VaccineConsultDeleteCard } from '../vaccine/consult/VaccineConsultDeleteCard';
import { PagesParentescoScreenStatus, PagesVaccineScreenStatus } from '../../../infrastructure/interfaces/screens.status';
import { Vaccine } from '../../../domain/entities/VaccineDependent';
import { ParentescoConsultDeleteCard } from './ParentescoConsultDeleteCard';
import { Relationship } from '../../../domain/entities/ParentescoEntity';
 


interface Props {
    goPage: PagesParentescoScreenStatus;
    parentesco: Relationship;
    onDelete: (id:string) => void;
}

 

export const CreateEditParentescoCard:FC<Props> = ( { parentesco, goPage = 'ParentescoEditCreateScreen', onDelete }:Props) => {

  return (
    <Layout  style={{flex:1}}>

      <ParentescoConsultDeleteCard
                                                  onDelete = { onDelete}
                                                  parentesco = { parentesco }
                                                 />
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