import { Button, Datepicker, DatepickerProps, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView, useWindowDimensions } from 'react-native'
import { MainLayout } from '../../layouts/MainLayout'
import * as Yup  from 'yup'
import moment from 'moment';
import { Register, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { getDependentByIdAction } from '../../../actions/dependents/get-dependent-by-id';
import { stylesFigma } from '../theme/appFigmaTheme';
import { MyIcon } from '../../components/ui/MyIcon';
import { ErrorMessage, Formik } from 'formik';
import { useGender } from '../../hooks/useGender';
import { useRelationShip } from '../../hooks/useRelationShip';
import { SelectSimpleUsageShowcase } from '../../components/ui/SelectSimpleUsageShowcase';
import { Estados } from '../../components/Estados';
import { Municipios } from '../../components/Municipios';
import { DependentById, DependentUpdateCreateResponse } from '../../../infrastructure/interfaces/dependentById-interface';
import { updateCreateDependentAction } from '../../../actions/dependents/update-create-dependents';
import { enviarMensajePorStatusCode } from '../messages/enviarMensajePorStatusCode';
import { useLogin } from '../../hooks/useLogin';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDependent } from '../../hooks/useDependent'
import { VaccinesModal } from '../../components/VaccinesModal'
import { Vaccine } from '../../../domain/entities/VaccineDependent'
import { PlanVaccinesDependentModal } from '../../components/PlanVaccinesDependentModal'

interface Props extends StackScreenProps<RootStackParams,'DependentAddEditScreen'>{};



export const DependentAddEditScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {  startLoading, stopLoading, isLoading } =  useDependent();
  
  const {height} = useWindowDimensions(); 
  const [idEstado, setIdEstado] = useState(0);
  const [municipio, setMunicipio] = useState('');
  const { user } = useLogin();
  
  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const dependentIdRef = useRef(route.params.dependentId);

  // const useDatepickerState = (initialDate = null): DatepickerProps => {
  //   const [date, setDate] = React.useState(initialDate);
  //   return { date, onSelect };
  // };

  //const smallDatepickerState = useDatepickerState();

 
  

 
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Requerido')
    .max(15, 'Debe de tener 15 caracteres o menos')
    .min(3,'Debe de tener 3 caracteres o mas'),
    lastname: Yup.string().required('Requerido')
    .max(15, 'Debe de tener 15 caracteres o menos')
    .min(3,'Debe de tener 3 caracteres o mas'),
    gender_id: Yup.string().required('Debe seleccionar el genero'),
    relationship_id: Yup.string().required('Debe seleccionar el parentesco'),
    birth: Yup.date().max(new Date(), 'La fecha de nacimiento no puede estar en el futuro')
    .required('La fecha de nacimiento es obligatoria'),
  });

  const mutation = useMutation({
    mutationFn: (data: DependentById) => {
      startLoading();
      let {_id, ...rest} = data;
       _id = {
           $oid: dependentIdRef.current
       }
       let resp = updateCreateDependentAction({...rest, _id}); 
       stopLoading()
     return resp;
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

  if (!dependent || isLoading) {
    return (<FullScreenLoader></FullScreenLoader>);
  }



  const onVaccine = (value:Vaccine) =>{
   
  }
  

  const onEstado = (value:any) =>{
      //setEstado(`${value?.capital}-${value?.estado}`);
      setIdEstado(value?.id_estado);
      setMunicipio('');
  }

  const onMuncipio = (value:any) =>{
    setMunicipio(value?.capital);
  }


  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(3000, 0, 1);
  return (
    <Formik
      initialValues={ dependent }
      validationSchema={validationSchema}
      onSubmit = { dependent => {
          let {  ...rest } = dependent;

       
         
      
          return mutation.mutate({ ...rest});
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
                            { dependentIdRef.current !== 'new'
                            ? (<Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Editar familiar</Text>)
                            : <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Agregar familiar</Text>}
                              
                          </Layout>
                          
                          {/* Inputs */}
                          <Layout style={{marginTop: 20}}>

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
                                   <Text style={{ color: 'red' }}> <ErrorMessage name="name" /></Text>
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
                               <Text style={{ color: 'red' }}> <ErrorMessage name="lastname" /></Text>
                          </Layout>   

                          <Layout>
                            { dependentIdRef.current !== 'new' && <PlanVaccinesDependentModal 
                                                                    dependentId={ dependentIdRef.current}
                                                                    onData={(value) =>{
                                                                    onVaccine(value)  
                                                                    setFieldValue('vaccine_id', `${value._id.$oid}`)
                                                                }}></PlanVaccinesDependentModal>}
                         
                              
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
                                  <Text style={{ color: 'red' }}> <ErrorMessage name="gender_id" /></Text>
                          </Layout> )}
                           {/* PARENTESCO */}
                        {relationships &&(<Layout style = {{ marginVertical:20}}>
                                  <Text style={ stylesFigma.label }>Parentesco:<Text style={{ color: 'skyblue' }}>*</Text></Text>
                                  <SelectSimpleUsageShowcase 
                                          idSelected={ values.relationship_id || ''  }
                                          items={ relationships} 
                                          onPress = { (value) => {
                                            setFieldValue('relationship_id', `${value?.key}`)
                                }}></SelectSimpleUsageShowcase>
                                 <Text style={{ color: 'red' }}> <ErrorMessage name="relationship_id" /></Text>
                          </Layout> )}

                           {/* EMAIL */}
                           <Layout style = {{ marginVertical:20}}>
                                  <Text style={ stylesFigma.label }>Dirección de correo electrónico:<Text style={{ color: 'skyblue' }}></Text></Text>
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
                                  style={stylesFigma.datepicker}
                                  min={minDate}
                                  max={maxDate}
                               
                                  placeholder='Selecciona una fecha'
                                  size='small'
                                  //date={new Date(moment(values.birth ?? new Date()).format('YYYY-MM-DD'))}
                                  date={moment(values.birth ?? new Date()).add(0, 'day').toDate()}
                              //    {...smallDatepickerState}
                                  onSelect={nextDate => {
                                    console.log({nextDate})
                                  
                                    setFieldValue('birth', nextDate || new Date())
                                  }}
      />

                               <Text style={{ color: 'red' }}> <ErrorMessage name="birth" /></Text>
                          </Layout>
                          
  
                         

                          { values.state && ( <Text category='h6'>{values.state? values.state:''}</Text> )}

                           {/* Estados */}
                           <Estados onData={(value) =>{
                                onEstado(value)  
                                setFieldValue('state', `${value?.capital} - ${value?.estado}`)
                            }}></Estados>
                             {/* Municipio */}
                            
                             { values.city && ( <Text category='h6'>{values.city? values.city:''}</Text> )}

                             <Layout style={{marginVertical:10}}></Layout>

                              <Municipios 
                                    onData={(value) =>{
                                      onMuncipio(value)  
                                      setFieldValue('city', `${value?.capital}`)
                                    }}
                                    idEstado = {idEstado}></Municipios>
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
                                          <Text style={ [stylesFigma.buttonText ] }> Guardar </Text>
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
