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
import { Dosi } from '../../../../domain/entities/apply-vaccine-interface';
import { useApplyVaccine } from '../../../hooks/useApplyVaccine';
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader';
 

interface Props extends StackScreenProps<RootStackParams,'ApplyVaccinesAddScreen'>{};

export const ApplyVaccinesAddScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {height} = useWindowDimensions(); 
  const [idVaccine, setIdVaccine] = useState('');
  const [IdDosis, setDosis] = useState('');
  const { user } = useLogin();
  

  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const dependentIdRef = useRef(route.params.dependentId);
  const { dosis:dosisList, isLoading, getDosis } = useApplyVaccine();
  useEffect(() => {
    getDosis(idVaccine, dependentIdRef.current);  
  
  }, [idVaccine, dependentIdRef.current])
  useEffect(() => {
   
  }, [])

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
    <Formik
      initialValues={ dependent }
      onSubmit = { dependent => {
          let { user_id, ...rest } = dependent;
          user_id = user?.usuario?._id
          return mutation.mutate({user_id, ...rest});
        }
      }
>
  {
    ( { handleChange, handleSubmit, values, errors, setFieldValue } ) => (

      <MainLayout
              title={ values.name ?? ''}
              subTitle={ values.lastname}
          >
            <Layout style={{ flex:1 }}>
              <ScrollView style={{marginHorizontal: 10}}>
                         <Layout>
                          { isLoading && ( <FullScreenLoader></FullScreenLoader> )} 
                         </Layout>
              
                          <Layout>
                            { dependentIdRef.current !== 'new'
                            ? (<Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Editar familiar</Text>)
                            : <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Agregar familiar</Text>}
                              
                          </Layout>
                          
                          {/* Inputs */}
                          <Layout style={{marginTop: 20}}>

                            {/* Vaccines */}
                            <VaccinesModal 
                                onData={(value) =>{
                                onVaccine(value)  
                                setFieldValue('state', `${value?.capital} - ${value?.estado}`)
                            }}></VaccinesModal>

                        { (dosisList && dosisList.length>0) && (<DosisModal 
                                vaccineId = {idVaccine} 
                                dependentId ={dependentIdRef.current}
                                onData={(value) =>{
                                onDosis(value)  
                                setFieldValue('state', `${value?.capital} - ${value?.estado}`)
                            }}></DosisModal>)}    

    

                           

                            {/* NOMBRE */}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Nombre:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      // placeholder="Nombre completo"
                                      accessoryLeft={ <MyIcon name="person-outline" />}
                                      placeholder="Enter your name:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('name') }
                                      value={ values.name }
                                      
                                  //  onSubmitEditing={ onRegister }
  
                                      autoCapitalize="words"
                                      autoCorrect={ false }
                                  />
                          </Layout>    
                          {/* APELLIDO */}
                          <Layout style = {{ marginVertical:20}}>
                              <Text style={ stylesFigma.label }>Apellido:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                              <Input 
                                  placeholder="Enter your lastname:"
                                  placeholderTextColor="rgba(0,0,0,0.4)"
                                  underlineColorAndroid="rgba(0,0,0,0)"
                                  style={[ 
                                      stylesFigma.inputField,
                                      ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                  ]}
                                  selectionColor="white"
  
                                  onChangeText={ handleChange('lastname') }
                                  value={ values.lastname }
                                  // onSubmitEditing={ onRegister }
  
                                  autoCapitalize="words"
                                  autoCorrect={ false }
                              />
                          </Layout>   

                           {/* SEXO */}
                        {genders &&(<Layout style = {{ marginVertical:20}}>
                                  <Text style={ stylesFigma.label }>Sexo:<Text style={{ color: 'skyblue' }}>*</Text></Text>
                                  <SelectSimpleUsageShowcase 
                                          idSelected={ values.gender_id  }
                                          items={ genders} 
                                          onPress = { (value) => {
                                            setFieldValue('gender_id', `${value?.key}`)
                                }}></SelectSimpleUsageShowcase>
                          </Layout> )}
                           {/* PARENTESCO */}
                        {relationships &&(<Layout style = {{ marginVertical:20}}>
                                  <Text style={ stylesFigma.label }>Parentesco:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <SelectSimpleUsageShowcase 
                                          idSelected={ values.relationship_id || ''  }
                                          items={ relationships} 
                                          onPress = { (value) => {
                                            setFieldValue('relationship_id', `${value?.key}`)
                                }}></SelectSimpleUsageShowcase>
                          </Layout> )}

                           {/* EMAIL */}
                           <Layout style = {{ marginVertical:20}}>
                                  <Text style={ stylesFigma.label }>Dirección de correo electrónico:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input 
                                      placeholder="Enter your email:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      keyboardType="email-address"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
                                      accessoryLeft={ <MyIcon name="email-outline" />}
                                      onChangeText={ handleChange('email') }
                                      value={ values.email }
                                      autoCapitalize="none"
                                      autoCorrect={ false }
                                  />
                          </Layout>

                          <Layout style = {{ marginVertical:20}}>
                              <Text category='h6'>
                                  {`Fecha de nacimiento`}
                              </Text>
                              <Datepicker
                                  onFocus  ={() => console.log()}
                                  onBlur ={() => console.log()}
                                  min={minDate}
                                  max={maxDate}
                                  date={new Date(moment(values.birth ?? new Date()).format('YYYY-MM-DD'))}
                                  onSelect={nextDate => setFieldValue('birth', nextDate || new Date())}
                                  placeholder='Selecciona una fecha'
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
