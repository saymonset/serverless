import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text , Datepicker} from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Platform, ScrollView, useWindowDimensions } from 'react-native'
import { RootStackParams } from '../../navigation/StackNavigator'
import { stylesFigma } from '../theme/appFigmaTheme'
import { MyIcon } from '../../components/ui/MyIcon'
import { Estados } from '../../components/Estados'
import { Municipios } from '../../components/Municipios'
import { SelectSimpleUsageShowcase } from '../../components/ui/SelectSimpleUsageShowcase'
import { useGender } from '../../hooks/useGender'
import { selectOption } from '../../../infrastructure/interfaces/select-option'
import { useRelationShip } from '../../hooks/useRelationShip'
import { Formik } from 'formik'
import * as yup from 'yup';
import { Register } from '../../../infrastructure/interfaces/register-interface'
import { useRegister } from '../../hooks/useRegister'
import { useSendSms } from '../../hooks/useSendSms'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'
import { LoadingScreen } from '../loading/LoadingScreen'
import { useNavigation } from '@react-navigation/native';

interface Props extends StackScreenProps<RootStackParams, 'SendRegisterFigmaScreen'> {}

export const SendRegisterFigmaScreen = () => {
   
    const {height} = useWindowDimensions(); 


    const {   isLoading, resp, message,removeMsg, registerData } = useRegister();
    const { loadGender, genders } =  useGender();
    const { loadRelationShip, isLoading:isLoadingrc, relationships } =  useRelationShip();
    
    const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
    const [ date, setDate ] = useState(new Date());
    const inputRef = useRef(null);
    const [idEstado, setIdEstado] = useState(0);
    const [municipio, setMunicipio] = useState('');
    
    const {password } =  useSendSms();

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    
 
    // const handlerGender = (  value : selectOption) => {
    //     console.log( value);
    // }
  
    let register:Register = { 
        name:      '',
        lastname:  '',
        password:   '',
        ci:         '',
        email:      '',
        state:     '',
        city:       '',
        birth:      null,
        gender_id:  '',
        status:    '',
    }

    const onSubmit = async(register:Register) => {
        //   const {birth, ...register} = register;
           let registerBd = {...register, password}
           
         registerData( registerBd);
        }
 

    const onSelectTrigger = (value:string ) => {
        setSelectedGeneroId(value);
    }

     const onEstado = (value:any) =>{
         // setEstado(`${value?.capital}-${value?.estado}`);
          setIdEstado(value?.id_estado);
          setMunicipio('');
     }
    
     const onMuncipio = (value:any) =>{
        setMunicipio(value?.capital);
       
   }
 

   useEffect(() => {
  
 
    if( message?.length === 0 ) return;
    
     // Si la respuesta es positiva entonces no sacamos ningun mensaje en el modal y nos vamos a otra pagina
     if (resp){
       // Alert.alert('Info', message);
        // console.log('------1------')
        // navigation.reset({
        //     index:0,
        //     routes:[{name:'LoginScreen'}]
        // });
        // console.log('------2------')
      } else{
        Alert.alert('Error', message);
      }
      removeMsg();
}, [ message ])

   useEffect(() => {
    loadGender();
    loadRelationShip();
   }, []);


   



            const minDate = new Date(1900, 0, 1);
            const maxDate = new Date(3000, 0, 1);
            const validationSchema = yup.object().shape({
                birth: yup.date().required('La fecha de nacimiento es requerida'),
              });
  return (
    <Formik
    initialValues={ register }
     onSubmit = { onSubmit}
    >
         {
            ({ handleChange, handleSubmit, values, errors, setFieldValue}) => (
                <Layout style={{ flex:1 }}>
                <ScrollView style={{marginHorizontal: 10}}>
                
                            <Layout>
                                <Text style={[stylesFigma.title, {textAlign:'left', left:10}]} category="h1">Datos personales</Text>
                                <Text style={[stylesFigma.titlesecund, {textAlign:'left', left:10, marginTop:60}]}>Por favor, llena los datos personales, luego
                                                                podras agregar perfiles de menores de edad si lo deseas</Text>
                            </Layout>
                            
                            {/* Inputs */}
                            <Layout style={{marginTop: 20}}>
                            <Text category='h6'>
                                {`Fecha de nacimiento`}
                            </Text>
                            <Datepicker
                                onFocus  ={() =>setFieldValue('birth', values.birth)}
                                onBlur ={() =>setFieldValue('birth', values.birth)}
                                min={minDate}
                                max={maxDate}
                                date={values.birth}
                                onSelect={nextDate => setFieldValue('birth', nextDate)}
                                placeholder='Selecciona una fecha'
                            />
    
                            <Layout style={{height:10}}></Layout>
    
                            {/* Estados */}
                            <Estados onData={(value) =>{
                                onEstado(value)  
                                setFieldValue('state', `${value?.capital} - ${value?.estado}`)
                                //</Layout>onEstado(value)
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
                                    <Text style={ stylesFigma.label }>Sexo:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                    <SelectSimpleUsageShowcase 
                                            items={ genders} 
                                            onPress = { (value) => {
                                                setFieldValue('gender_id', `${value?.key}`)
                                            //    handlerGender(value);

                                    }}></SelectSimpleUsageShowcase>
                            </Layout> )}
                      
                               {/* CEDULA */}
                            <Layout style = {{ marginVertical:20}}>
                                        <Text style={ stylesFigma.label }>Cedula:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                        <Input 
                                            placeholder="V- 12345678"
                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                            underlineColorAndroid="rgba(0,0,0,0)"
                                            style={[ 
                                                stylesFigma.inputField,
                                                ( Platform.OS === 'ios' ) && stylesFigma.inputFieldIOS
                                            ]}
                                            selectionColor="white"
    
                                            onChangeText={ handleChange('ci') }
                                            value={ values.ci }
                                            //onSubmitEditing={ onRegister }
    
                                            autoCapitalize="words"
                                            autoCorrect={ false }
                                        />
                            </Layout>  
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
                                        // onSubmitEditing={ onRegister }
    
    
                                        autoCapitalize="none"
                                        autoCorrect={ false }
                                    />
                            </Layout>
      
                            </Layout>
    
                            {  isLoading && (  <LoadingScreen />  )}

                            {/* Space */}
                            <Layout style={{height: 10}} />
                            {/* Button */}
                            <Layout style={{...stylesFigma.buttonContainer,  alignItems:'center', marginTop:10, marginBottom:50}  }>
                                 
                                {/* Crear una nueva cuenta */}
                                    <Button 
                                                disabled={ isLoading }
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
            )
         }
        
 
        
     
    </Formik>
  )
}
