 
import React, { useEffect, useState } from 'react'
import { Layout, List, Text } from '@ui-kitten/components';
import { RefreshControl } from 'react-native-gesture-handler';
import { useQueryClient } from '@tanstack/react-query';
import { PagesScreenStatus, PagesVaccineScreenStatus } from '../../../../infrastructure/interfaces/screens.status';
 
import { DosisEntity, Vaccine, VaccineByIDEntity } from '../../../../domain/entities/VaccineEditCreateEntity';
import { CreateEditVaccineCard } from '../consult/CreateEditVaccineCard';
import { CreateEditDosisCard } from './CreateEditDosisCard';
import { VaccinesModal } from '../../VaccinesModal';
import { getVaccineByIdAction } from '../../../../actions/vaccines/createEditVaccinesAction';
import { useVaccines } from '../../../hooks/useVaccines';
 

interface Props {
    goPage: PagesVaccineScreenStatus;
    dosis: DosisEntity[];
    onDelete: (idDelete:string) => void;
    fetchNextPage ?: () => void;
}
export const CreateEditDosisList = ( {dosis, goPage,  fetchNextPage, onDelete }:Props) => {

       const queryClient = useQueryClient();
       const [isRefreshing, setIsRefreshing] = useState(false);
      
       
      
       const onPullToRefresh = async() =>{
             setIsRefreshing(true);
             await new Promise(resolve => setTimeout(resolve,200));
             queryClient.invalidateQueries({queryKey: ['dosis', 'infinite']});
             setIsRefreshing(false)
       }

  return (
    <Layout style={{flex:1}}>
      <List
          data= { dosis ?? [] }
          numColumns = { 1 }
          keyExtractor= { (item, index) => `${item._id}-${index}` }
          renderItem= {( { item } ) => (
           
            <CreateEditDosisCard 
                   onDelete= { onDelete }
                   goPage={ goPage }
                   dosis={ item}/>
          )}
          
          ListFooterComponent={ () => <Layout style={{ flex:1}}/>}
         // onEndReached= { fetchNextPage  }
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

 