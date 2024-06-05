import { Button, CheckBox, Datepicker, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, Pressable, ScrollView, useWindowDimensions } from 'react-native'
 
import moment from 'moment';
import {   useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {  StackScreenProps } from '@react-navigation/stack';
import * as Yup  from 'yup'
 
import { ErrorMessage, Formik } from 'formik';
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
import { CameraAdapter } from '../../../../config/adapters/camera-adapter';
import { VaccineDosisImages } from '../../../components/images/VaccineDosisImages';
import { usePlanVaccines } from '../../../hooks/usePlanVaccines';
 

interface Props extends StackScreenProps<RootStackParams,'ApplyVaccinesAddScreen'>{};

export const ApplyVaccinesAddScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {height} = useWindowDimensions(); 
  const [idVaccine, setIdVaccine] = useState('');
  const [IdDosis, setDosis] = useState('');
  const { user } = useLogin();
  const {   getVaccines } = useVaccines();
  const [images, setImages] = useState([]);
  

  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const dependentIdRef = useRef(route.params.dependentId);
  const { dosis:dosisList, isLoading, getDosis } = useApplyVaccine();
  const { getVaccinesAll  } = useVaccines();
  const {   getPlanVaccinesByDependent } = usePlanVaccines();
  const [canGalery, setCanGalery] = React.useState(false);

  
  useEffect(() => {
    getDosis(idVaccine, dependentIdRef.current);  
  
  }, [idVaccine, dependentIdRef.current]);


  useEffect(() => {
     // Cargamos las vacunas de ese familiar
     getVaccines(dependentIdRef.current);
  }, [dependentIdRef.current]);



 

  const mutation = useMutation({
    mutationFn: (data: ApplyVaccineCreateResponse) => {
      let {dependent_id, ...rest} = data;

      $dependent_id: dependentIdRef.current;
     
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
    },
  });

  const { data:vaccineApply } = useQuery({
    queryKey: ['vaccineApply', dependentIdRef.current],
    queryFn: () => getApplyVaccineAction(dependentIdRef.current)
  });

  if (!vaccineApply) {
    return (<FullScreenLoader></FullScreenLoader>);
  }


  const validationSchema = Yup.object().shape({
    lote: Yup.string().required('Requerido')
    .max(30, 'Debe de tener 30 caracteres o menos')
    .min(1,'Debe de tener 3 caracteres o mas'),
    vaccine_id: Yup.string().required('Requerido')
   ,
    dosis_id: Yup.string().required('Requerido')
   ,
   image: Yup.string().required('Debe tomar una foto'),
    
  });
  
  

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
      validationSchema={validationSchema}
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
                                dependentId = { dependentIdRef.current }
                                onData={(value) =>{
                                onVaccine(value)  
                                setFieldValue('vaccine_id', `${value._id.$oid}`)
                            }}></VaccinesModal>
                             <Text style={{ color: 'red' }}> <ErrorMessage name="vaccine_id" /></Text>

                        { (idVaccine) && (<DosisModal 
                                vaccineId = {idVaccine} 
                                dependentId ={dependentIdRef.current}
                                onData={(value) =>{
                                onDosis(value)  
                                setFieldValue('dosis_id', `${value._id.$oid}`)
                            }}></DosisModal>)}    
                             <Text style={{ color: 'red' }}> <ErrorMessage name="dosis_id" /></Text>

    

                           

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
                                  <Text style={{ color: 'red' }}> <ErrorMessage name="lote" /></Text>
                          </Layout>    
                          {/* IMAGE */}
                          <Layout style = {{ marginVertical:20}}>
                              <Text style={ stylesFigma.label }>Imagen:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                              {images && images.length>0 && (<Layout
                                    style={{
                                      marginVertical: 10,
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-start',
                                    }}>
                                    <VaccineDosisImages images={images} />
                                </Layout>)}
                                <Layout style={{flexDirection:'row'}}>
                                     
                                      <CheckBox
                                      style={{marginLeft:10}}
                                          checked={canGalery}
                                          onChange={nextChecked => setCanGalery(nextChecked)}
                                        >
                                          {`Desde la galeria ?`}
                                      </CheckBox>  
                                      <Pressable onPress={ async () => {
                                            const photos = canGalery? await CameraAdapter.getPicturesFromLibrary() : await CameraAdapter.takePicture();
                                            const fileImages = photos.filter( image => image.includes('file://'));
                                            setImages(fileImages)
                                            let imgVaccine = fileImages[0].split('/').pop();
                                            console.log({imgVaccine, fileImages});
                                            setFieldValue('image', imgVaccine);
                                            
                                          }}>
                                              <MyIcon name={"camera-outline"} /> 
                                      </Pressable>
                                    
                                      <Text style={{ color: 'red' }}> <ErrorMessage name="image" /></Text>
                                      <Input 
                                          disabled
                                          placeholder="Enter your image:"
                                          placeholderTextColor="rgba(0,0,0,0.4)"
                                          underlineColorAndroid="rgba(0,0,0,0)"
                                          style={[ 
                                              stylesFigma.inputField,
                                              ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS,
                                              { display: 'none' }
                                          ]}
                                          selectionColor="white"

                                          onChangeText={ handleChange('image') }
                                          value={ values.image }
                                          // onSubmitEditing={ onRegister }

                                          autoCapitalize="words"
                                          autoCorrect={ false }
                                      />
                                </Layout>

                               
                             
                          </Layout>   
  

                          <Layout style = {{ marginVertical:20}}>
                              <Text category='h6'>
                                  {`Fecha de vacunacion`} 
                              </Text>


                             

                          <Datepicker
                                onFocus  ={() =>setFieldValue('vaccination_date', values.vaccination_date)}
                                onBlur ={() =>setFieldValue('vaccination_date', values.vaccination_date)}
                                min={minDate}
                                max={maxDate}
                                date={values.vaccination_date}
                                onSelect={nextDate => setFieldValue('vaccination_date', nextDate)}
                                placeholder='Selecciona una fecha'
                            />



 
                                <Text style={{ color: 'red' }}> <ErrorMessage name="vaccination_date" /></Text>
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
