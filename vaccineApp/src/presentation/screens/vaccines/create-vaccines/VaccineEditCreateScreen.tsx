import { Button, CheckBox, Datepicker, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView, useWindowDimensions } from 'react-native'
import * as Yup  from 'yup'

import moment from 'moment';
import { Register, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { useLogin } from '../../../hooks/useLogin';
import { useGender } from '../../../hooks/useGender';
import { useRelationShip } from '../../../hooks/useRelationShip';
import { DependentById, DependentUpdateCreateResponse } from '../../../../infrastructure/interfaces/dependentById-interface';
import { updateCreateDependentAction } from '../../../../actions/dependents/update-create-dependents';
import { enviarMensajePorStatusCode } from '../../messages/enviarMensajePorStatusCode';
import { getDependentByIdAction } from '../../../../actions/dependents/get-dependent-by-id';
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader';
import { Formik } from 'formik';
import { MainLayout } from '../../../layouts/MainLayout';
import { stylesFigma } from '../../theme/appFigmaTheme';
import { MyIcon } from '../../../components/ui/MyIcon';
import { SelectSimpleUsageShowcase } from '../../../components/ui/SelectSimpleUsageShowcase';
import { Municipios } from '../../../components/Municipios';
import { Estados } from '../../../components/Estados';
import { Vaccine, VaccinePutPostResponseEntity } from '../../../../domain/entities/VaccineEditCreateEntity';
import { getVaccineByIdAction, updateCreateVaccineAction } from '../../../../actions/vaccines/createEditVaccinesAction';

interface Props extends StackScreenProps<RootStackParams,'VaccineEditCreateScreen'>{};

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
});


export const VaccineEditCreateScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {height} = useWindowDimensions(); 
  const [idEstado, setIdEstado] = useState(0);
  const [municipio, setMunicipio] = useState('');
  const { user } = useLogin();
  
  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const vaccineIdRef = useRef(route.params.vaccineId);
  const [checkedChild, setCheckedChild] = React.useState(false);

 

  const mutation = useMutation({
    mutationFn: (data: Vaccine) => {
      let {_id, ...rest} = data;
       _id = {
           $oid: vaccineIdRef.current
       }
     return updateCreateVaccineAction({...rest, _id});
    }
   ,
    onSuccess(data: VaccinePutPostResponseEntity) {
      vaccineIdRef.current = data._id?.$oid ?? ''; // creación

      const { statusCode, resp } = data;
      if (statusCode == 401 || !resp) {
        Alert.alert('Info', enviarMensajePorStatusCode(statusCode+''));
        return 
      }else if (resp){
        Alert.alert('Info', enviarMensajePorStatusCode('200'));   
      }
      queryClient.invalidateQueries({queryKey: ['vaccines', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['vaccine', vaccineIdRef.current]});
      // queryClient.setQueryData(['product',  data.id ], data);
    },
  });

  const { data:vaccine } = useQuery({
    queryKey: ['vaccine', vaccineIdRef.current],
    queryFn: () => getVaccineByIdAction(vaccineIdRef.current)
  });

  if (!vaccine) {
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

  // useEffect(() => {
  //   console.log(error)
  // }, [error])
  

  // 
  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(3000, 0, 1);
  return (
    <Formik
      initialValues={ vaccine }
      validationSchema={validationSchema}
      onSubmit = { vaccine => {
          let { _id, ...rest } = vaccine;

        
         
           
          return mutation.mutate({_id, ...rest});
        }
      }
>
  {
    ( { handleChange, handleSubmit, values, errors, setFieldValue } ) => (

      <MainLayout
              title={ values.name ?? ''}
              subTitle={ ''}
          >
            <Layout style={{ flex:1 }}>
              <ScrollView style={{marginHorizontal: 10}}>
              
                          <Layout>
                            { vaccineIdRef.current !== 'new'
                            ? (<Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Editar Vacuna</Text>)
                            : <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Agregar Vacuna</Text>}
                              
                          </Layout>
                          
                          {/* Inputs */}
                          <Layout style={{marginTop: 20}}>

                            {/* NOMBRE */}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Nombre:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      // placeholder="Nombre completo"
                                      accessoryLeft={<></>}
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
                            {/* DESCRIPCION */}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Descripción:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      // placeholder="Nombre completo"
                                      accessoryLeft={ <></>}
                                      placeholder="Enter your description:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      multiline={true}
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('description') }
                                      value={ values.description }
                                      
                                  //  onSubmitEditing={ onRegister }
  
                                      autoCapitalize="words"
                                      autoCorrect={ false }
                                  />
                            </Layout>    

                            {/* DISEASE PREVENTS */}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Enfermedades que previene:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      // placeholder="Nombre completo"
                                      accessoryLeft={ <></>}
                                      placeholder="Enter your description:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('disease_prevents') }
                                      value={ values.disease_prevents }
                                      
                                  //  onSubmitEditing={ onRegister }
  
                                      autoCapitalize="words"
                                      autoCorrect={ false }
                                  />
                            </Layout>    
                            {/* application_age*/}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Edad recomendada para la aplicación de la vacuna:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      accessoryLeft={ <></>}
                                      placeholder="Enter your description:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('application_age') }
                                      value={ values.application_age }
                                      
                                  //  onSubmitEditing={ onRegister }
  
                                      autoCapitalize="words"
                                      autoCorrect={ false }
                                  />
                            </Layout>    
                            {/* isChildren */}
                            <Layout style = {{ marginVertical:20}}>
                                 
                                 <CheckBox
                                    checked={ values.isChildren}
                                    onChange={nextChecked => {
                                      setCheckedChild(nextChecked);
                                      setFieldValue('isChildren',nextChecked)
                                    } }
                                  >
                                   <Text style={ stylesFigma.label }>Es Nińo ?</Text>
                                  </CheckBox>
                            
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
                                          <Text style={ [stylesFigma.buttonText ] }>Guardar</Text>
                                          
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
