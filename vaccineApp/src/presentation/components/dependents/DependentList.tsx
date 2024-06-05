 
import React, { useState } from 'react'
import { Dependent } from '../../../infrastructure/interfaces/dependent-interface';
import { Layout, List, Text } from '@ui-kitten/components';
import { DependentCard } from './DependentCard';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';
import { PagesScreenStatus } from '../../../infrastructure/interfaces/screens.status';

interface Props {
    goPage: PagesScreenStatus;
    dependents: Dependent[];
    fetchNextPage : () => void;
    onDeleteRow? : (idRow: string)=> void;
}
export const DependentList = ( {dependents, goPage,  fetchNextPage , onDeleteRow}:Props) => {

       const queryClient = useQueryClient();
       const [isRefreshing, setIsRefreshing] = useState(false);

       const onPullToRefresh = async() =>{
             setIsRefreshing(true);
             await new Promise(resolve => setTimeout(resolve,200));
             queryClient.invalidateQueries({queryKey: ['dependents', 'infinite']});
             queryClient.invalidateQueries({queryKey: ['applyvaccinedependents', 'infinite']});
             queryClient.invalidateQueries({queryKey: ['consultvaccinedependents', 'infinite']});
             setIsRefreshing(false)
       }

  return (
    <Layout style={{flex:1}}>
      <List
          data= { dependents ?? [] }
          numColumns = { 1 }
          keyExtractor= { (item, index) => `${item?._id ?? ''}-${index}` }
          renderItem= {( { item } ) => (
           
            <DependentCard 
                   onDeleteRow = { onDeleteRow }
                   goPage={ goPage }
                   dependent={ item}/>
          )}
          
          ListFooterComponent={ () => <Layout style={{ flex:1}}/>}
          //onEndReached= { fetchNextPage }
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

 