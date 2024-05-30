import { Button, Datepicker, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView, useWindowDimensions } from 'react-native'
 
import moment from 'moment';
import {   useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  StackScreenProps } from '@react-navigation/stack';
 
import { Formik } from 'formik';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { useLogin } from '../../../hooks/useLogin';
import { useGender } from '../../../hooks/useGender';
import { useRelationShip } from '../../../hooks/useRelationShip';
import { DependentById, DependentUpdateCreateResponse } from '../../../../infrastructure/interfaces/dependentById-interface';
import { updateCreateDependentAction } from '../../../../actions/dependents/update-create-dependents';
import { enviarMensajePorStatusCode } from '../../messages/enviarMensajePorStatusCode';
import { getDependentByIdAction } from '../../../../actions/dependents/get-dependent-by-id';
import { MainLayout } from '../../../layouts/MainLayout';
import { stylesFigma } from '../../theme/appFigmaTheme';
import { MyIcon } from '../../../components/ui/MyIcon';
import { SelectSimpleUsageShowcase } from '../../../components/ui/SelectSimpleUsageShowcase';
import { VaccinesModal } from '../../../components/VaccinesModal';
import { Vaccine } from '../../../../domain/entities/VaccineDependent';
import { DosisModal } from '../../../components/DosisModal';
import { Dosi } from '../../../../domain/entities/apply-vaccine-interface';
import { useApplyVaccine } from '../../../hooks/useApplyVaccine';
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader';
import { useConsultVaccine } from '../../../hooks/useConsultVaccine';
import { ConsultVaccineDetailScreen } from './ConsultVaccineDetailScreen';
import { useVaccines } from '../../../hooks/useVaccines';
 

interface Props extends StackScreenProps<RootStackParams,'ConsultVaccinesScreen'>{};

export const ConsultVaccinesScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {height} = useWindowDimensions(); 
  const [idVaccine, setIdVaccine] = useState('');
  const [IdDosis, setDosis] = useState('');
  const { user } = useLogin();
  
  

  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const dependentIdRef = useRef(route.params.dependentId);
  

  const mutation = useMutation({
    mutationFn: (data: DependentById) => {
      let {_id, ...rest} = data;
       _id = {
           $oid: dependentIdRef.current
       }
     return updateCreateDependentAction({...rest, _id});
    }
   ,
    onSuccess(data: DependentUpdateCreateResponse) {
      dependentIdRef.current = data._id?.$oid ?? ''; // creación

      const { statusCode, resp } = data;
      if (statusCode == 401 || !resp) {
        Alert.alert('Info', enviarMensajePorStatusCode(statusCode+''));
        return 
      }else if (resp){
        Alert.alert('Info', enviarMensajePorStatusCode('200'));   
      }
      queryClient.invalidateQueries({queryKey: ['dependents', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['dependent', dependentIdRef.current]});
      // queryClient.setQueryData(['product',  data.id ], data);
    },
  });

  const { data:dependent } = useQuery({
    queryKey: ['dependent', dependentIdRef.current],
    queryFn: () => getDependentByIdAction(dependentIdRef.current)
  });

  if (!dependent) {
    return (<FullScreenLoader></FullScreenLoader>);
  }



  

  const onVaccine = (value:Vaccine) =>{
      // setEstado(`${value?.capital}-${value?.estado}`);
      console.log(value._id.$oid)
      setIdVaccine(value._id.$oid);
      setDosis('');
  }

  const onDosis = (value:Dosi) =>{
    setDosis(value._id.$oid);
  }


  

  // 
  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(3000, 0, 1);
  return (
 
    <ConsultVaccineDetailScreen
      dependent_id={ dependentIdRef.current }
    ></ConsultVaccineDetailScreen>
     
  )
}
