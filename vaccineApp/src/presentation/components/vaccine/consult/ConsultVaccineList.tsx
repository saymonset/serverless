import { useQueryClient } from '@tanstack/react-query';
import { Layout, List } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native-gesture-handler'
import { ApplyVaccine } from '../../../../domain/entities/ConsultByIndependentEntity';
import { VaccineStatus } from '../../../../infrastructure/interfaces/vaccine.status';
import { useConsultVaccine } from '../../../hooks/useConsultVaccine';
import { LoadingScreen } from '../../../screens/loading/LoadingScreen';
import { ConsultVaccineCard } from './ConsultVaccineCard';


export const ConsultVaccineList = () => {

    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { isLoading, applyVaccinesUniqByIds } = useConsultVaccine();
    

    const onPullToRefresh = async() =>{
          setIsRefreshing(true);
          await new Promise(resolve => setTimeout(resolve,200));
          queryClient.invalidateQueries({queryKey: ['dependents', 'infinite']});
          setIsRefreshing(false)
    }
  return (
    <>
     {  ( isLoading ) 
                  ?  (<LoadingScreen />)
                  : <Layout style={{flex:1}}>
                  { ( <List
                        data= { applyVaccinesUniqByIds ?? [] }
                        numColumns = { 1 }
                        keyExtractor= { (item, index) => `${item._id}-${index}` }
                        renderItem= {( { item } ) => (
                         
                          <ConsultVaccineCard 
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
                    /> )}  
                  </Layout> }
    </>
    
  )
}
