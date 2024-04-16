import React, { useState } from 'react'
import {  Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, 
    TouchableOpacity, TouchableWithoutFeedback, View, FlatList } from 'react-native';
 import {  comunStylesFigma } from '../theme/comunFigmaTheme'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { PaisScreen } from '../hooks/usePaisScreen';
import { registerThunks } from '../store/slices/register';
import { UseGenderComponent } from './GenderComponent';
import { CalendarFigmaComponent } from './CalendarFigmaComponent';
import { Pais } from '../interfaces/appInterfaces'
import { ModalCitiesComponent } from '../components/ModalCitiesComponent';

interface Props1  {
    onLogin: () => void;
    onRegisterScreen: () => void;
}

export const RegistrodatosFigmaComponent = ( { onLogin, onRegisterScreen }: Props1) => {


  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMunicipio, setIsVisibleMunicipio] = useState(false);
  const [idEstado, setIdEstado] = useState(0);
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState("");
  const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
  const onSelectTrigger = (value ) => {
      setSelectedGeneroId(value);
  }
  const { password:paswordFromSecurity } = useSelector( (state: store ) => state.registerStore);
  const { token, phone } = useSelector( (state: store ) => state.sendSmsStore);
  const dispatch = useDispatch();
  const { name,  lastname,  password, ci, email, state, city, birth, gender_id, status, onChange } = useForm({
      name:'', lastname:'', password:'', ci:'', email:'', state:'', city:'', birth:'', gender_id:'', status:true
   });
  const { estadosOfVenezuela, municipiosOfEstadosOfVenezuela } = PaisScreen(); 


   const showModal = async() => {
        setIsVisible(true);
   }

   const showModalMunicipio = async() => {
       setIsVisibleMunicipio(true);
   }

   const getValor = (menuItem: Pais,  propiedad ) => {
     if (propiedad === 'estado'){
        setIsVisible(false);
        setIdEstado(menuItem.id_estado) 
        let mun = municipiosOfEstadosOfVenezuela(menuItem.id_estado)[0].municipios;
        setEstado(`${menuItem.capital}-${menuItem.estado}`)
        setMunicipio('');
     }

     if (propiedad === 'municipio'){
        setIsVisibleMunicipio(false);
        setMunicipio(`${menuItem.capital}-${menuItem.municipio}`);
     }
    }

   
  const onRegister = async() => {
                Keyboard.dismiss();
                let obj = {
                name,
                lastname,
                password:paswordFromSecurity,
                ci,
                email,
                state:estado,
                city:municipio,
                birth,
                gender_id:selectedGeneroId,
                status,
                token,
                phone
                };
                    let register: Register = { ...obj  };
                    await dispatch(registerThunks( register));
                
                    {/** Ya lo registramos y Nos vamos a la pantalla principal con este metodo que se ejcuta en la pantalla anterior */}
                    onRegisterScreen();
  }

        const onDateSelection = (date:Date)=>{
            // Serialize the date object to a string con date.toISOString()
            onChange(date.toISOString(), 'birth')
        }

      
    

  return (
    <>
      <KeyboardAvoidingView
                style={{ flex: 1}}
                behavior={ ( Platform.OS === 'ios') ? 'padding': undefined }
            >
                <ScrollView>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={ comunStylesFigma.formContainer }>                

                            <Text style={ comunStylesFigma.title }>Registro</Text>
                            <SafeAreaView 
                            style={[comunStylesFigma.container]}>
                                                <View style={[comunStylesFigma.column]}>
                                                    {/* FECHA DE NACIMIENTO */}
                                                    <View style = {{ marginTop:20}}>
                                                                <Text style={ comunStylesFigma.label }>Fecha de nacimiento:</Text>
                                                                <CalendarFigmaComponent onDateSelection= {(value) => onDateSelection(value)}/>
                                                    </View>
                                                    {/* ESTADO */}
                                                    <View style = {{ marginTop:10}}>
                                                                <Text  style={[ 
                                                                        comunStylesFigma.inputField,
                                                                        ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                                    ]}>{estado}</Text>

                                                                {isVisible && (<ModalCitiesComponent getValor = { ( item, propiedad ) => getValor( item, propiedad )}
                                                                                                     propiedad = 'estado' 
                                                                                                    />
                                                                               )
                                                                }    

                                                                <TouchableOpacity
                                                                    style={[
                                                                        comunStylesFigma.inputField,
                                                                        {marginTop:10},
                                                                        (Platform.OS === 'ios') && comunStylesFigma.inputFieldIOS,
                                                                        { backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
                                                                    ]}
                                                                    onPress={() => showModal(false)}
                                                                    >
                                                                    <Text style={ {...comunStylesFigma.label, color:'white'} }>Estado:</Text>
                                                                </TouchableOpacity>

                                                    </View>  
                                                     {/* MUNICIPIO */}
                                                    { estado && ( <View style = {{ marginTop:10}}>
                                                                            <Text  style={[ 
                                                                                    comunStylesFigma.inputField,
                                                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                                                ]}>{municipio}</Text>

                                                                    {isVisibleMunicipio && (<ModalCitiesComponent getValor = { ( item, propiedad ) => getValor( item, propiedad )}
                                                                                                                  propiedad = 'municipio' 
                                                                                                                  idEstado={ idEstado}
                                                                                                    />
                                                                               )
                                                                     }    
                                                                            <TouchableOpacity
                                                                                style={[
                                                                                    comunStylesFigma.inputField,
                                                                                    {marginTop:10},
                                                                                    (Platform.OS === 'ios') && comunStylesFigma.inputFieldIOS,
                                                                                    { backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
                                                                                ]}
                                                                                onPress={() => showModalMunicipio(true)}
                                                                                >
                                                                                <Text style={{ color: 'white' }}> Municipio</Text>
                                                                                </TouchableOpacity>
                                                     </View>    )}
                                                     {/* NOMBRE */}
                                                    <View style = {{ marginVertical:20}}>
                                                        <Text style={ comunStylesFigma.label }>Nombre:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                                        <TextInput 
                                                            placeholder="Enter your name:"
                                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                                            underlineColorAndroid="rgba(0,0,0,0.4)"
                                                            style={[ 
                                                                comunStylesFigma.inputField,
                                                                ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                            ]}
                                                            selectionColor="white"

                                                            onChangeText={ (value) => onChange(value, 'name') }
                                                            value={ name }
                                                          //  onSubmitEditing={ onRegister }

                                                            autoCapitalize="words"
                                                            autoCorrect={ false }
                                                        />
                                                    </View> 
                                                     {/* APELLIDO */}
                                                    <View style = {{ marginVertical:20}}>
                                                        <Text style={ comunStylesFigma.label }>Apellido:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                                        <TextInput 
                                                            placeholder="Enter your lastname:"
                                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                                            underlineColorAndroid="rgba(0,0,0,0.4)"
                                                            style={[ 
                                                                comunStylesFigma.inputField,
                                                                ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                            ]}
                                                            selectionColor="white"

                                                            onChangeText={ (value) => onChange(value, 'lastname') }
                                                            value={ lastname }
                                                           // onSubmitEditing={ onRegister }

                                                            autoCapitalize="words"
                                                            autoCorrect={ false }
                                                        />
                                                    </View> 
                                                     {/* SEXO */}
                                                    <View style = {{ marginVertical:20}}>
                                                                <Text style={ comunStylesFigma.label }>Sexo:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                                                <UseGenderComponent onPress={ onSelectTrigger }/> 
                                                    </View>  
                                                     {/* CEDULA */}
                                                    <View style = {{ marginVertical:20}}>
                                                                <Text style={ comunStylesFigma.label }>Cedula:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                                                <TextInput 
                                                                    placeholder="V- 12345678"
                                                                    placeholderTextColor="rgba(0,0,0,0.4)"
                                                                    underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                    style={[ 
                                                                        comunStylesFigma.inputField,
                                                                        ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                                    ]}
                                                                    selectionColor="white"

                                                                    onChangeText={ (value) => onChange(value, 'ci') }
                                                                    value={ ci }
                                                                   //onSubmitEditing={ onRegister }

                                                                    autoCapitalize="words"
                                                                    autoCorrect={ false }
                                                                />
                                                    </View>  
                                                     {/* EMAIL */}
                                                    <View style = {{ marginVertical:20}}>
                                                            <Text style={ comunStylesFigma.label }>Dirección de correo electrónico:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                                            <TextInput 
                                                                placeholder="Enter your email:"
                                                                placeholderTextColor="rgba(0,0,0,0.4)"
                                                                keyboardType="email-address"
                                                                underlineColorAndroid="rgba(0,0,0,0.4)"
                                                                style={[ 
                                                                    comunStylesFigma.inputField,
                                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                                ]}
                                                                selectionColor="white"

                                                                onChangeText={ (value) => onChange(value, 'email') }
                                                                value={ email }
                                                               // onSubmitEditing={ onRegister }


                                                                autoCapitalize="none"
                                                                autoCorrect={ false }
                                                            />
                                                    </View>
                                                    
                                                      {/* Crear una nueva cuenta */}
                                        <View style={{...comunStylesFigma.buttonContainer,  alignItems:'center', marginTop:10, marginBottom:50}  }>
                                            <TouchableOpacity 
                                                     onPress= { onRegister} 
                                                     style={ {...comunStylesFigma.button} }
                                                    >
                                                   <Text style={ [comunStylesFigma.buttonText ] }>Guardar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                  
                    </SafeAreaView>
                            
                            </View>
                    </TouchableWithoutFeedback>
              </ScrollView>
      </KeyboardAvoidingView>

 

                                      
                                       
     

                                         

                                          
    </>  
  )
}
