import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { v4 as uuidv4 } from 'uuid';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Layout, Text } from '@ui-kitten/components';
import React, { useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SectionList, useWindowDimensions } from 'react-native';
import { getCalendarVaccineByDependentAction } from '../../../actions/calendarvaccinedependent/calendarVaccineDependentAction';
import { CalendarVaccineByDependentResponse } from '../../../infrastructure/interfaces/calendar-vaccinebydependents';
import { Separator } from '../../components/ui/Separator';
import { Stepper } from '../../components/ui/Stepper';
import { useLogin } from '../../hooks/useLogin';
import { RootStackParams } from '../../navigation/StackNavigator';
import { LoadingScreen } from '../loading/LoadingScreen';

interface Props extends StackScreenProps<RootStackParams,'CalendarVaccineByDependentScreen'>{};

export const CalendarVaccineByDependentScreen = ({route}:Props) => {
  

  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();
  const { user } = useLogin();
  const [ term, setTerm ] = useState('');
  const queryClient = useQueryClient();
  
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const dependentIdRef = useRef(route.params.dependentId);
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

const { isLoading, data, refetch } = useInfiniteQuery({
  queryKey:['calendarvaccinedependents', 'infinite'],
  staleTime: 1000 * 60 * 60, // 1 hour
  initialPageParam: 0,
  queryFn: async ( params )=>  {
    const calendars: CalendarVaccineByDependentResponse[] = await getCalendarVaccineByDependentAction(dependentIdRef.current);
   // console.log('saymons length = '+calendars.length)
    // Utilizando un bucle forEach    
    // calendars.forEach((calendar) => {
    // //  console.log(calendar);
    // });
    return calendars;
  },
  getNextPageParam: ( ) => undefined,
})


 
 

  return (
    <Layout style={{flex:1}}>
      

    {  ( isLoading )  ?  (<LoadingScreen />)
                      :   <SectionList 
                      sections={ data?.pages.flat() ?? [] }
                      keyExtractor={() => Math.random().toString(36).substr(2, 9)} // Generates a random key for each item
                      // renderItem={ ({ item }) => <CalendarVaccineDependentComponent  item={item}/> }
                      renderItem={ ({ item }) => <Stepper
                                titleVaccine = { item.titleVaccine ?? ''}
                                dosisApplied = { item.dosisApplied ?? 0}  
                                ofCountDosis = { item.ofCountDosis ?? 0}  
                                titleDosis  = { item.titleDosis ?? []}  
                      ></Stepper> }
  
                      renderSectionHeader={ ({section})=> <Text style={{ marginVertical: 2 }}>{ section.title }</Text>}
                      stickySectionHeadersEnabled
                      SectionSeparatorComponent={ Separator }
                      ListHeaderComponent={ () => <Text style={{ marginVertical: 2 }}>{ `Calendario` }</Text>}
                      ListFooterComponent={ () =>  <Text style={{ marginVertical: 2 }}>{ `${ data?.pages.flat().length ?? 0 }` }</Text> }
  
                      showsVerticalScrollIndicator={ true }
                      style={{
                        height: height - top - 0
                      }}
                 />
    }
 

  
  </Layout>
  )
}
