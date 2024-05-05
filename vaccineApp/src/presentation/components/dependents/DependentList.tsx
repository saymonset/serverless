 
import React, { useState } from 'react'
import { Dependent } from '../../../infrastructure/interfaces/dependent-interface';
import { Layout, List, Text } from '@ui-kitten/components';
import { DependentCard } from './DependentCard';
import { RefreshControl } from 'react-native-gesture-handler';

interface Props {
    dependents: Dependent[];
    fetchNextPage : () => void;
}
export const DependentList = ( {dependents, fetchNextPage }:Props) => {

       const [isRefreshing, setIsRefreshing] = useState(false);

       const onPullToRefresh = async() =>{
             setIsRefreshing(true);
             await new Promise(resolve => setTimeout(resolve,1500));
             setIsRefreshing(false)
       }

  return (
    <Layout style={{flex:1}}>
      <List
          data= { dependents }
          numColumns = { 1 }
          keyExtractor= { (item, index) => `${item._id}-${index}` }
          renderItem= {( { item } ) => (
              <DependentCard dependent={ item}/>
          )}
          ListFooterComponent={ () => <Layout style={{ flex:1}}/>}
          onEndReached= { fetchNextPage }
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

 