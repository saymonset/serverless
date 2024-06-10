import { Button, CheckBox, Datepicker, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView, useWindowDimensions } from 'react-native'
import * as Yup  from 'yup'

import moment from 'moment';
import { Register, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useLogin } from '../../hooks/useLogin';
import { useGender } from '../../hooks/useGender';
import { useRelationShip } from '../../hooks/useRelationShip';
import { enviarMensajePorStatusCode } from '../messages/enviarMensajePorStatusCode';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ErrorMessage, Formik } from 'formik';
import { MainLayout } from '../../layouts/MainLayout';
import { stylesFigma } from '../theme/appFigmaTheme';
import { Relationship } from '../../../domain/entities/ParentescoEntity';
import { getParentescoByIdAction, updateCreateParentescoAction } from '../../../actions/parentescos/createEditParentescosAction';


interface Props extends StackScreenProps<RootStackParams,'ParentescoEditCreateScreen'>{};




export const ParentescoEditCreateScreen = ({route}:Props) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const {height} = useWindowDimensions(); 
  const [idEstado, setIdEstado] = useState(0);
  const [municipio, setMunicipio] = useState('');
  const { user } = useLogin();
  
  const {  genders } =  useGender();
  const {  relationships } =  useRelationShip();
  const parentescoIdRef = useRef(route.params.parentescoId);
  const [checkedChild, setCheckedChild] = React.useState(false);

 

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Requerido')
    .max(15, 'Debe de tener 15 caracteres o menos')
    .min(3,'Debe de tener 3 caracteres o mas')
  });

  const mutation = useMutation({
    mutationFn: (data: Relationship) => {
      let {_id, ...rest} = data;
       _id = {
           $oid: parentescoIdRef.current
       }
     return updateCreateParentescoAction({...rest, _id});
    }
   ,
    onSuccess(data: Relationship) {
      parentescoIdRef.current = data._id?.$oid ?? ''; // creación

      const { statusCode, resp } = data;
      if (statusCode == 401 || !resp) {
        Alert.alert('Info', enviarMensajePorStatusCode(statusCode+''));
        return 
      }else if (resp){
        Alert.alert('Info', enviarMensajePorStatusCode('200'));   
      }
      queryClient.invalidateQueries({queryKey: ['parentescos', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['parentesco', parentescoIdRef.current]});
      // queryClient.setQueryData(['product',  data.id ], data);
    },
  });

  const { data:parentesco } = useQuery({
    queryKey: ['parentesco', parentescoIdRef.current],
    queryFn: () => getParentescoByIdAction(parentescoIdRef.current)
  });

  if (!parentesco) {
    return (<FullScreenLoader></FullScreenLoader>);
  }
 
  const minDate = new Date(1900, 0, 1);
  const maxDate = new Date(3000, 0, 1);
  return (
    <Formik
      initialValues={ parentesco }
      validationSchema={validationSchema}
      onSubmit = { parentesco => {
        
          let { _id, ...rest } = parentesco;
         return mutation.mutate({_id, ...rest});
        }
      }
      

>
  {
    ( { handleChange, handleSubmit, values, errors, setFieldValue,  } ) => (

      <MainLayout
              title={ values.name ?? ''}
              subTitle={ ''}
          >
            <Layout style={{ flex:1 }}>
              <ScrollView style={{marginHorizontal: 10}}>
              
                          <Layout>
                            { parentescoIdRef.current !== 'new'
                            ? (<Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Editar Parentesco</Text>)
                            : <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Agregar Parentesco</Text>}
                              
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
                                   <Text style={{ color: 'red' }}> <ErrorMessage name="name"/></Text>
                                   
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
