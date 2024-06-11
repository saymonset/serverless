import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Layout, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { getCalendarVaccineByDependentAction } from '../../../actions/calendarvaccinedependent/calendarVaccineDependentAction';
import { useLogin } from '../../hooks/useLogin';
import { RootStackParams } from '../../navigation/StackNavigator';

export const CalendarTabScreen = () => {
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
    const dependents = await getCalendarVaccineByDependentAction(10000,params.pageParam, termUpdate(),user!);
    return dependents;
  },
  getNextPageParam: ( lastPage, allPages) => allPages.length,
})

  return (
    <Layout><Text>CalendarTabScreen</Text></Layout>
  )
}
