import { useQueryClient } from '@tanstack/react-query';
import { Layout, List } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { ApplyVaccine } from '../../../../domain/entities/ConsultByIndependentEntity';
import { VaccineStatus } from '../../../../infrastructure/interfaces/vaccine.status';
import { useConsultVaccine } from '../../../hooks/useConsultVaccine';
import { ConsultDosisCard } from './ConsultDosisCard';
import { ConsultVaccineCard } from './ConsultVaccineCard';

interface Props {
    applyvaccines: ApplyVaccine[];
}

export const ConsultDosisList = ( { applyvaccines } : Props) => {

 
    
 
  return (
    <Layout style={{flex:1}}>
    { ( <List
          data= { applyvaccines ?? [] }
          numColumns = { 1 }
          keyExtractor= { (item, index) => `${item._id}-${index}` }
          renderItem= {( { item } ) => (
           
            <ConsultDosisCard 
                   applyVaccine={ item}/>
          )}
          
          ListFooterComponent={ () => <Layout style={{ flex:1}}/>}
          onEndReachedThreshold={ 0.8 }
         
      /> )}  
    </Layout>
  )
}
