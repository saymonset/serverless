 
import React, { FC, useState } from 'react'
import { Layout, List, Text } from '@ui-kitten/components';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';
import { PagesParentescoScreenStatus, PagesVaccineScreenStatus } from '../../../infrastructure/interfaces/screens.status';
import { Vaccine } from '../../../domain/entities/VaccineDependent';
import { CreateEditParentescoCard } from './CreateEditParentescoCard';
import { Relationship } from '../../../domain/entities/ParentescoEntity';


interface Props {
    goPage: PagesParentescoScreenStatus;
    parentescos: Relationship[];
    fetchNextPage : () => void;
    onDelete: (id:string) => void;
}
export const CreateEditParentescoList :FC<Props> = ( {parentescos, goPage, onDelete,  fetchNextPage }:Props) => {

       const queryClient = useQueryClient();
       const [isRefreshing, setIsRefreshing] = useState(false);

       const onPullToRefresh = async() =>{
             setIsRefreshing(true);
             queryClient.invalidateQueries({queryKey:['parentescos', 'infinite']});
             setIsRefreshing(false)
       }

  return (
    <Layout style={{flex:1}}>
      <List
          data= { parentescos }
          numColumns = { 1 }
          keyExtractor= { (item, index) => `${item._id}-${index}` }
          renderItem= {( { item } ) => (
           
            <CreateEditParentescoCard 
                   onDelete ={ onDelete }
                   goPage={ goPage }
                   parentesco={ item}/>
          )}
          
          ListFooterComponent={ () => <Layout style={{ flex:1}}/>}
         // onEndReached= { fetchNextPage }
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

 