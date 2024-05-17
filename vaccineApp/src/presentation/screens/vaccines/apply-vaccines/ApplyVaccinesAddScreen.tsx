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
import { Estados } from '../../../components/Estados';
import { VaccinesModal } from '../../../components/VaccinesModal';
import { Vaccine } from '../../../../domain/entities/VaccineDependent';
import { DosisModal } from '../../../components/DosisModal';
import { useApplyVaccine } from '../../../hooks/useApplyVaccine';
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader';
import { getApplyVaccineAction, updateCreateApplyVaccinneAction } from '../../../../actions/apply-vaccine/applyVaccineAction';
import { ApplyVaccineCreateResponse, Dosi } from '../../../../infrastructure/interfaces/apply-vaccine-response';
import { useVaccines } from '../../../hooks/useVaccines';
 

interface Props extends StackScreenProps<RootStackParams,'ApplyVaccinesAddScreen'>{};

export const ApplyVaccinesAddScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {height} = useWindowDimensions(); 
  const [idVaccine, setIdVaccine] = useState('');
  const [IdDosis, setDosis] = useState('');
  const { user } = useLogin();
  const {   getVaccines } = useVaccines();
  

  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const dependentIdRef = useRef(route.params.dependentId);
  const { dosis:dosisList, isLoading, getDosis } = useApplyVaccine();
  useEffect(() => {
    getDosis(idVaccine, dependentIdRef.current);  
  
  }, [idVaccine, dependentIdRef.current])
  useEffect(() => {
     // Cargamos las vacunas de ese familiar
     getVaccines(dependentIdRef.current);
  }, [dependentIdRef.current])

  const mutation = useMutation({
    mutationFn: (data: ApplyVaccineCreateResponse) => {
      let {dependent_id, ...rest} = data;

      $dependent_id: dependentIdRef.current
     return updateCreateApplyVaccinneAction({...rest, dependent_id});
    }
   ,
    onSuccess(data: ApplyVaccineCreateResponse) {
      dependentIdRef.current = data.dependent_id || 'new'; // creación

      const { statusCode, resp } = data;
      if (statusCode == 401 || !resp) {
        Alert.alert('Info', enviarMensajePorStatusCode(statusCode+''));
        return 
      }else if (resp){
        Alert.alert('Info', enviarMensajePorStatusCode('200'));   
      }
      queryClient.invalidateQueries({queryKey: ['applyVaccines', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['vaccineApply', dependentIdRef.current]});
      // queryClient.setQueryData(['product',  data.id ], data);
    },
  });

  const { data:vaccineApply } = useQuery({
    queryKey: ['vaccineApply', dependentIdRef.current],
    queryFn: () => getApplyVaccineAction(dependentIdRef.current)
  });

  if (!vaccineApply) {
    return (<FullScreenLoader></FullScreenLoader>);
  }



  

  const onVaccine = (value:Vaccine) =>{
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
    <Formik
      initialValues={ vaccineApply }
      
      onSubmit = { vaccineApply => {
          let { dependent_id, ...rest } = vaccineApply;
          dependent_id = dependentIdRef.current;
         
        
          return mutation.mutate({dependent_id, ...rest});
        }
      }
>
  {
    ( { handleChange, handleSubmit, values, errors, setFieldValue } ) => (

      <MainLayout
              title={  'Aplicar Vacuna'}
              subTitle={ ''}
          >
            <Layout style={{ flex:1 }}>
              <ScrollView style={{marginHorizontal: 10}}>
                         <Layout>
                          { isLoading && ( <FullScreenLoader></FullScreenLoader> )} 
                         </Layout>
              
                          
                          
                          {/* Inputs */}
                          <Layout style={{marginTop: 20}}>

                            {/* Vaccines */}
                            <VaccinesModal 
                                onData={(value) =>{
                                onVaccine(value)  
                                setFieldValue('vaccine_id', `${value._id.$oid}`)
                            }}></VaccinesModal>

                        { (dosisList && dosisList.length>0) && (<DosisModal 
                                vaccineId = {idVaccine} 
                                dependentId ={dependentIdRef.current}
                                onData={(value) =>{
                                onDosis(value)  
                                setFieldValue('dosis_id', `${value._id.$oid}`)
                            }}></DosisModal>)}    

    

                           

                            {/* LOTE */}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Lote:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      // placeholder="lote completo"
                                      accessoryLeft={ <MyIcon name="person-outline" />}
                                      placeholder="Enter lote:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('lote') }
                                      value={ values.lote }
                                      
                                  //  onSubmitEditing={ onRegister }
  
                                      autoCapitalize="words"
                                      autoCorrect={ false }
                                  />
                          </Layout>    
                          {/* IMAGE */}
                          <Layout style = {{ marginVertical:20}}>
                              <Text style={ stylesFigma.label }>Imagen:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                              <Input 
                                  placeholder="Enter your lastname:"
                                  placeholderTextColor="rgba(0,0,0,0.4)"
                                  underlineColorAndroid="rgba(0,0,0,0)"
                                  style={[ 
                                      stylesFigma.inputField,
                                      ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                  ]}
                                  selectionColor="white"
  
                                  onChangeText={ handleChange('image') }
                                  value={ values.image }
                                  // onSubmitEditing={ onRegister }
  
                                  autoCapitalize="words"
                                  autoCorrect={ false }
                              />
                          </Layout>   
  

                          <Layout style = {{ marginVertical:20}}>
                              <Text category='h6'>
                                  {`Fecha de vacunacion`}
                              </Text>
                              <Datepicker
                                  onFocus  ={() => console.log()}
                                  onBlur ={() => console.log()}
                                  min={minDate}
                                  max={maxDate}
                                  date={new Date(moment( new Date()).format('YYYY-MM-DD'))}
                                  onSelect={nextDate => setFieldValue('vaccination_date', nextDate || new Date())}
                                  placeholder='Selecciona de vacunación'
                              />
                          </Layout>
                          
  
                          <Layout style={{height:10}}></Layout>

                         
                          </Layout>
  
                          {/* {  isLoading && (  <LoadingScreen />  )} */}

                          {/* Space */}
                          <Layout style={{height: 10}} />
                          {/* Button */}
                          <Layout style={{...stylesFigma.buttonContainer,  alignItems:'center', marginTop:10, marginBottom:50}  }>
                              
                              {/* Crear una nueva cuenta */}
                                  <Button 
                                              disabled={ mutation.isPending }
                                              onPress={() => handleSubmit()}
                                              style={ {...stylesFigma.button} }
                                          >
                                          <Text style={ [stylesFigma.buttonText ] }>Guardar </Text>
                                  </Button>
                                
                            
                          </Layout>
                  
                   
                {/* Información para crear cuenta */}
                  <Layout style={{height: 150}} />
  
              </ScrollView>   
            </Layout>
            
      </MainLayout>
    )
  }

</Formik>
   
   
     
  )
}
