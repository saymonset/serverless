import { useQueryClient } from '@tanstack/react-query';
import { Layout, List } from '@ui-kitten/components'
import React, { useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { ApplyVaccine } from '../../../../domain/entities/ConsultByIndependentEntity';
import { VaccineStatus } from '../../../../infrastructure/interfaces/vaccine.status';
import { ConsultVaccineCard } from './ConsultVaccineCard';

interface Props {
    goPage: VaccineStatus;
    applyVaccine: ApplyVaccine[];
}

export const ConsultVaccineList = ({applyVaccine, goPage }:Props) => {

    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onPullToRefresh = async() =>{
          setIsRefreshing(true);
          await new Promise(resolve => setTimeout(resolve,200));
          queryClient.invalidateQueries({queryKey: ['dependents', 'infinite']});
          setIsRefreshing(false)
    }
  return (
    <Layout style={{flex:1}}>
      <List
          data= { applyVaccine }
          numColumns = { 1 }
          keyExtractor= { (item, index) => `${item._id}-${index}` }
          renderItem= {( { item } ) => (
           
            <ConsultVaccineCard 
                   goPage={ goPage }
                   applyVaccine={ item}/>
          )}
          
          ListFooterComponent={ () => <Layout style={{ flex:1}}/>}
          onEndReachedThreshold={ 0.8 }
          refreshControl = {
            <RefreshControl 
                refreshing = { isRefreshing }
                onRefresh = { onPullToRefresh }
            />
          }
      />
    </Layout>
  )
}
