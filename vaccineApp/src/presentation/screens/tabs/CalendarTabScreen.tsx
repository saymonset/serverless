import { NavigationProp, useNavigation } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { SectionList, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getCalendarVaccineByDependentAction } from '../../../actions/calendarvaccinedependent/calendarVaccineDependentAction';
import { CalendarVaccineByDependentResponse } from '../../../infrastructure/interfaces/calendar-vaccinebydependents';
import { Separator } from '../../components/ui/Separator';
import { useLogin } from '../../hooks/useLogin';
import { RootStackParams } from '../../navigation/StackNavigator';
import { CalendarVaccineDependentComponent } from '../../components/calendar/CalendarVaccineDependentComponent';
import { LoadingScreen } from '../loading/LoadingScreen';

export const CalendarTabScreen = () => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const { user } = useLogin();
  const [ term, setTerm ] = useState('');
  const queryClient = useQueryClient();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  useEffect(() => {
    termUpdate(term);
    queryClient.invalidateQueries({queryKey: ['calendarvaccinedependents', 'infinite']});
    refetch();
}, [term])  

const termUpdate = (termino:string = "''"):string => {
     if (termino){
        if (termino.length === 0 ) {
          setTerm("''");
        }else{
          setTerm(termino);
        }
     } 
      return term;
}

const { isLoading, data, fetchNextPage, refetch } = useInfiniteQuery({
  queryKey:['calendarvaccinedependents', 'infinite'],
  staleTime: 1000 * 60 * 60, // 1 hour
  initialPageParam: 0,
  queryFn: async ( params )=>  {
    const calendars: CalendarVaccineByDependentResponse[] = await getCalendarVaccineByDependentAction(10000,params.pageParam, termUpdate(),user!);
    // Utilizando un bucle forEach
    // calendars.forEach((calendar) => {
    // //  console.log(calendar);
    // });
    return calendars;
  },
  getNextPageParam: ( lastPage, allPages) => allPages.length,
})

  return (
    <Layout style={{flex:1}}>

      {  ( isLoading )  ?  (<LoadingScreen />)
                        :  <SectionList 
                        sections={ data?.pages.flat() ?? [] }
                        keyExtractor={() => uuidv4()}
                        renderItem={ ({ item }) => <CalendarVaccineDependentComponent  item={item}/> }
    
                        renderSectionHeader={ ({section})=> <Text style={{ marginVertical: 2 }}>{ section.title }</Text>}
                        stickySectionHeadersEnabled
    
                        SectionSeparatorComponent={ Separator }
                        ListHeaderComponent={ () => <Text style={{ marginVertical: 2 }}>{ `Calendario` }</Text>}
                        ListFooterComponent={ () =>  <Text style={{ marginVertical: 2 }}>{ `${ data?.pages.flat().length ?? 0 }` }</Text> }
    
                        showsVerticalScrollIndicator={ false }
                        style={{
                          height: height - top - 120
                        }}
                      />
      }
   
  
    
    </Layout>
  )
}

