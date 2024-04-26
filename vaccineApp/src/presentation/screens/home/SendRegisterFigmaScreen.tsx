import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text , Datepicker} from '@ui-kitten/components'
import React, { useEffect, useRef, useState } from 'react'
import { Platform, ScrollView, useWindowDimensions } from 'react-native'
import { RootStackParams } from '../../navigation/StackNavigator'
import { stylesFigma } from '../theme/appFigmaTheme'
import { MyIcon } from '../../components/ui/MyIcon'
import { StyleSheet } from 'react-native';
import { Estados } from '../../components/Estados'
import { Municipios } from '../../components/Municipios'
import { SelectSimpleUsageShowcase } from '../../components/ui/SelectSimpleUsageShowcase'
import { useGender } from '../../hooks/useGender'
import { selectOption } from '../../../infrastructure/interfaces/select-option'


interface Props extends StackScreenProps<RootStackParams, 'SendRegisterFigmaScreen'> {}
export const SendRegisterFigmaScreen = () => {
    const {height} = useWindowDimensions(); 
    const { loadGender, isLoading, genders } =  useGender();
    

     

    const [ date, setDate ] = useState(new Date());
    const inputRef = useRef(null);
    const [idEstado, setIdEstado] = useState(0);
    const [estado, setEstado] = useState('');
    const [municipio, setMunicipio] = useState('');

    const handlerGender = (  value : selectOption) => {
        console.log( value);
    }

    const onSubmit = async( ) => {
        console.log('pasa');
      
    }

    const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
    const onSelectTrigger = (value:string ) => {
        setSelectedGeneroId(value);
    }

     const onEstado = (value:any) =>{
          setEstado(`${value?.capital}-${value?.estado}`);
          setIdEstado(value?.id_estado);
          setMunicipio('');
     }
    
     const onMuncipio = (value:any) =>{
        console.log(value?.capital);
        setMunicipio(value?.capital);
       
   }
 

   useEffect(() => {
   
    loadGender();
   }, [])
   

  return (
    <>
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
                            date={date}
                            onSelect={nextDate => setDate(nextDate)}
                        />

                        <Layout style={{height:10}}></Layout>

                        {/* Estados */}
                        <Estados onData={(value) =>onEstado(value)}></Estados>
                         {/* Municipio */}
                         <Text category='h6'>
                            {`${municipio}`}
                        </Text>
                          <Municipios 
                                      onData={(value) =>onMuncipio(value)}
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

                                    onChangeText={ (value) => console.log() }
                                    value={ '' }
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

                                onChangeText={(value) => console.log()  }
                                value={ '' }
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
                                        onPress = { handlerGender}></SelectSimpleUsageShowcase>
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

                                        onChangeText={ (value) => console.log() }
                                        value={ '' }
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
                                    onChangeText={() => console.log()  }
                                    value={ '' }
                                    // onSubmitEditing={ onRegister }


                                    autoCapitalize="none"
                                    autoCorrect={ false }
                                />
                        </Layout>
  
                        </Layout>

                        {/* Space */}
                        <Layout style={{height: 10}} />
                        {/* Button */}
                        <Layout style={{...stylesFigma.buttonContainer,  alignItems:'center', marginTop:10, marginBottom:50}  }>
                            {/* Crear una nueva cuenta */}
                                <Button 
                                            onPress= { ()=> {}} 
                                            style={ {...stylesFigma.button} }
                                        >
                                        <Text style={ [stylesFigma.buttonText ] }>Guardar</Text>
                                </Button>
                           
                        </Layout>
                

              

            </ScrollView>   
        </Layout>
 
        
     
    </>
  )
}
