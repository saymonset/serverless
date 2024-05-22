import { Button, Datepicker, Input, Layout, Text, useTheme } from '@ui-kitten/components'
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

interface Props extends StackScreenProps<RootStackParams,'DependentScreen'>{};

export const DependentScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  
  const {height} = useWindowDimensions(); 
  const [idEstado, setIdEstado] = useState(0);
  const [municipio, setMunicipio] = useState('');
  const { user } = useLogin();
  
  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const dependentIdRef = useRef(route.params.dependentId);
  const { dependentIdDeleted } = useDependent();

  useEffect(() => {
    console.log('-----pasando-----')
     console.log({dependentIdDeleted})
  }, [dependentIdDeleted])
  

 
  const validationSchema = Yup.object().shape({
    gender_id: Yup.string().required('Debe seleccionar el genero')
  ,
  });

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



  

  const onEstado = (value:any) =>{
      // setEstado(`${value?.capital}-${value?.estado}`);
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
          let { ...rest } = dependent;
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
                                  <Text style={{ color: 'red' }}> <ErrorMessage name="gender_id" /></Text>
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

                           {/* Estados */}
                           <Estados onData={(value) =>{
                                onEstado(value)  
                                setFieldValue('state', `${value?.capital} - ${value?.estado}`)
                            }}></Estados>
                             {/* Municipio */}
                             <Text category='h6'>
                                {`${municipio}`}
                            </Text>
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
                                          <Text style={ [stylesFigma.buttonText ] }>{dependentIdDeleted} ' '{dependentIdDeleted!='' ? 'Delete': 'Guardar'} </Text>
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
