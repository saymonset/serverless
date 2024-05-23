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
import { enviarMensajePorStatusCode } from '../../messages/enviarMensajePorStatusCode';
import { FullScreenLoader } from '../../../components/ui/FullScreenLoader';
import { ErrorMessage, Formik } from 'formik';
import { MainLayout } from '../../../layouts/MainLayout';
import { stylesFigma } from '../../theme/appFigmaTheme';
import { getDosisByIdAction, updateCreateDosisAction } from '../../../../actions/dosis/createEditDosisAction';
import { DosisByIdEntity } from '../../../../domain/entities/DosisEditCreateEntity';
import { useVaccines } from '../../../hooks/useVaccines';
import { useDosis } from '../../../hooks/useDosis';
import { LoadingScreen } from '../../loading/LoadingScreen';

interface Props extends StackScreenProps<RootStackParams,'DosisEditCreateScreen'>{};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Requerido')
  .max(15, 'Debe de tener 15 caracteres o menos'),
  age_frequency: Yup.string().required('Requerido')
  .max(15, 'Debe de tener 15 caracteres o menos'),
  columReporte: Yup.number().required('Requerido').positive('El número debe ser positivo'),
  rowReporte: Yup.number().required('Requerido').positive('El número debe ser positivo'),
  expires_in_days: Yup.number().required('Requerido'),
});

 


export const DosisEditCreateScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {height} = useWindowDimensions(); 
  const { user } = useLogin();
  
  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const dosisIdRef = useRef(route.params.dosisId);
  const [checkedChild, setCheckedChild] = React.useState(false);
  const { vaccineId } = useVaccines();
  

 

  const mutation = useMutation({
    mutationFn: (data: DosisByIdEntity) => {
      let {_id, ...rest} = data;
       _id = {
           $oid: dosisIdRef.current
       }
     return updateCreateDosisAction({...rest, _id});
    }
   ,
    onSuccess(data: DosisByIdEntity) {
      dosisIdRef.current = data._id?.$oid ?? ''; // creación

      const { statusCode, resp } = data;
      if (!resp) {
        Alert.alert('Info', enviarMensajePorStatusCode(statusCode+''));
        return 
      }else if (resp){
        Alert.alert('Info', enviarMensajePorStatusCode('200'));   
      }
      queryClient.invalidateQueries({queryKey: ['dosis', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['dosi', dosisIdRef.current]});
      // queryClient.setQueryData(['product',  data.id ], data);
    },
  });

  const { data:dosi } = useQuery({
    queryKey: ['dosi', dosisIdRef.current],
    queryFn: () => getDosisByIdAction(dosisIdRef.current)
  });

  if (!dosi ) {
    return (<FullScreenLoader></FullScreenLoader>);
  }



  
 

  // 
  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(3000, 0, 1);
  return (
    <Formik
      initialValues={ dosi }
      validationSchema={validationSchema}
      onSubmit = { dosi => {
          let { _id,vacinne_id, ...rest } = dosi;
          vacinne_id = vaccineId;

        
         
         //  console.log({_id, vacinne_id, ...rest});
          return mutation.mutate({_id, vacinne_id, ...rest});
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
                            { dosisIdRef.current !== 'new'
                            ? (<Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Editar Dosis</Text>)
                            : <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Agregar Dosis</Text>}
                              
                          </Layout>
                          
                          {/* Inputs */}
                          <Layout style={{marginTop: 20}}>

                            {/* NOMBRE */}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Nombre:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      // placeholder="Nombre completo"
                                      accessoryLeft={<></>}
                                      placeholder="Enter  name:"
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
                                   <Text style={{ color: 'red' }}> <ErrorMessage name="name"/></Text>
                          </Layout>    
                            {/* DESCRIPCION */}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Edad para la aplicacion de la vacuna:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      // placeholder="Nombre completo"
                                      accessoryLeft={ <></>}
                                      placeholder="Edad aplicar vacuna"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      multiline={true}
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('age_frequency') }
                                      value={ values.age_frequency }
                                      
                                  //  onSubmitEditing={ onRegister }
  
                                      autoCapitalize="words"
                                      autoCorrect={ false }
                                  />
                                   <Text style={{ color: 'red' }}> <ErrorMessage name="age_frequency"/></Text>
                            </Layout>    

                            {/* DISEASE PREVENTS */}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Número de columna en el reporte:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      // placeholder="Nombre completo"
                                      accessoryLeft={ <></>}
                                      placeholder="Enter column:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('columReporte') }
                                      value={ values.columReporte }
                                      
                                  //  onSubmitEditing={ onRegister }
  
                                      autoCapitalize="words"
                                      autoCorrect={ false }
                                      keyboardType="numeric"
                                  />
                                   <Text style={{ color: 'red' }}> <ErrorMessage name="columReporte"/></Text>
                            </Layout>    
                            {/* application_age*/}
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }>Número de fila en el reporte:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      accessoryLeft={ <></>}
                                      placeholder="Enter row:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('rowReporte') }
                                      value={ values.rowReporte }
                                      
                                  //  onSubmitEditing={ onRegister }
  
                                      autoCapitalize="words"
                                      autoCorrect={ false }
                                      keyboardType="numeric"
                                  />
                                  <Text style={{ color: 'red' }}> <ErrorMessage name="rowReporte"/></Text>
                            </Layout>    
                            <Layout style = {{ marginVertical:20}}>
                                 <Text style={ stylesFigma.label }> Número de dias para aplicar al familiar:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                  <Input
                                      accessoryLeft={ <></>}
                                      placeholder="Enter days:"
                                      placeholderTextColor="rgba(0,0,0,0.4)"
                                      underlineColorAndroid="rgba(0,0,0,0)"
                                      style={[ 
                                          stylesFigma.inputField,
                                          ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                      ]}
                                      selectionColor="white"
  
                                      onChangeText={ handleChange('expires_in_days') }
                                      value={ values.expires_in_days +''}
                                    
                                      autoCorrect={ false }
                                      keyboardType="numeric"
                                  />
                                   <Text style={{ color: 'red' }}> <ErrorMessage name="expires_in_days"/></Text>
                            </Layout>    
                            
                         

                          
                          
  
                          <Layout style={{height:10}}></Layout>

                         
                          </Layout>
  
                          {/* {  isLoading && (  <LoadingScreen />  )} */}

                          {/* Space */}
                          <Layout style={{height: 10}} />
                          {/* Button */}
                          <Layout style={{...stylesFigma.buttonContainer,  alignItems:'center', marginTop:10, marginBottom:50}  }>
                              
                              {/* Crear una nueva cuenta */}
                             { ( mutation.isPending  ) &&  (<LoadingScreen />) }
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
