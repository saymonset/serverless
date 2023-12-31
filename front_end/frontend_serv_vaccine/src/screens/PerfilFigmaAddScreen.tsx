import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { BackgroundSendPhoneFigma } from '../components/BackgroundSendPhoneFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RegistrodatosFigmaComponent } from '../components/RegistrodatosFigmaComponent';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunks, removeErrorThunks } from '../store/slices/register/registerThunks';
import { RegisterComponent } from '../components/RegisterComponent';
import { ModalMessageComponent } from '../components/ModalMessageComponent';
import { useNavigation } from '@react-navigation/native';
import { Register } from '../interfaces';
import { useForm } from '../hooks/useForm';
import { PaisScreen } from '../hooks/usePaisScreen';
import {  comunStylesFigma } from '../theme/comunFigmaTheme'
import { CalendarFigmaComponent } from '../components/CalendarFigmaComponent';
import { ModalCitiesComponent } from '../components/ModalCitiesComponent';
import { UseGenderComponent } from '../components/GenderComponent';





export const PerfilFigmaAddScreen = () => {



  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMunicipio, setIsVisibleMunicipio] = useState(false);
  const [idEstado, setIdEstado] = useState(0);
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState("");
  const [selectedGeneroId, setSelectedGeneroId] = React.useState("");

  const onSelectTrigger = (value) => {
    setSelectedGeneroId(value);
  }
  const { isLoading, message, resp, password: paswordFromSecurity } = useSelector((state: store) => state.registerStore);
  const { token, phone } = useSelector((state: store) => state.sendSmsStore);
  const { name, lastname, password, ci, email, state, city, birth, gender_id, status, onChange } = useForm({
    name: '', lastname: '', password: '', ci: '', email: '', state: '', city: '', birth: '', gender_id: '', status: true
  });
  const { estadosOfVenezuela, municipiosOfEstadosOfVenezuela } = PaisScreen();
  const navigation = useNavigation();


  //const [isVisible, setIsVisible] = useState(false);
  //const { message, resp } = useSelector((state: store) => state.registerStore);
  const dispatch = useDispatch();

  const onBack = async () => {
    Keyboard.dismiss();
    navigation.navigate('HomeFigmaTab2Screen' as never)
  }

  const onClearError = async () => {
    await removeErrorThunks(dispatch)
    console.log('removiendo error createregister')
  }

  const cerrarModal = () => {
    setIsVisible(false);
    //Borramos mensajes del thrunk
    onClearError();

    if (resp) {
      navigation.replace('LoginFigmaScreen')
    }
  }

  const abrirModal = () => {
    setIsVisible(true);
  }

  useEffect(() => {
    if (message.length === 0) return;

    // Si la respuesta es positiva entonces no sacamos ningun mensaje en el modal y nos vamos a otra pagina
    if (resp) {
      cerrarModal();
    } else {
      abrirModal();
    }

  }, [message])



  const onLogin = () => {
    navigation.replace('LoginScreen')
  }






  const showModal = async () => {
    setIsVisible(true);
  }

  const showModalMunicipio = async () => {
    setIsVisibleMunicipio(true);
  }

  const getValor = (menuItem: Pais, propiedad) => {
    if (propiedad === 'estado') {
      setIsVisible(false);
      setIdEstado(menuItem.id_estado)
      let mun = municipiosOfEstadosOfVenezuela(menuItem.id_estado)[0].municipios;
      setEstado(`${menuItem.capital}-${menuItem.estado}`)
      setMunicipio('');
    }

    if (propiedad === 'municipio') {
      setIsVisibleMunicipio(false);
      setMunicipio(`${menuItem.capital}-${menuItem.municipio}`);
    }
  }


  const onRegister = async () => {
    Keyboard.dismiss();
    let obj = {
      name,
      lastname,
      password: paswordFromSecurity,
      ci,
      email,
      state: estado,
      city: municipio,
      birth,
      gender_id: selectedGeneroId,
      status: status.toString(),
      token,
      phone
    };
    let register: Register = { ...obj };

    console.log({ phone })
    await dispatch(registerThunks(register));

    {/** Nos vamos a la pantalla principal */ }
    //onRegisterScreen();
  }

  const onDateSelection = (date: Date) => {
    onChange(date, 'birth')
  }





  return (
    <>
      {/* Background */}
      <BackgroundSendPhoneFigma></BackgroundSendPhoneFigma>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 0,
        marginLeft: 15,
        marginHorizontal: 1,
        marginTop: (Platform.OS === 'ios') ? 30 : 30
      }}>
        <TouchableOpacity onPress={() => onBack()} style={{ marginTop: 0 }}>
          <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>


      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >


        <View style={stylesFigma.formContainer}>

          <View style={{ flex: 1 }}>
            <HeaderTitleFigma title="Agregar familiar"
              marginTop={(Platform.OS === 'ios') ? 40 : 40}
              stylesFigma={stylesFigma}
              type='big'
              marginBottom={0}
            ></HeaderTitleFigma>
            {/* <RegistrodatosFigmaComponent onLogin={onLogin} onRegisterScreen={() => onRegister()}></RegistrodatosFigmaComponent> */}

                <ScrollView>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                          <View style = { styles.globalMargin }>        
                                        <View style = {{ marginVertical:20}}>
                                            <Text>Nombre:<Text style={{ color: 'skyblue' }}> *</Text></Text>
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
                                                onSubmitEditing={ onRegister }

                                                autoCapitalize="words"
                                                autoCorrect={ false }
                                            />
                                        </View> 
                                        <View style = {{ marginVertical:20}}>
                                                        <Text>Apellido:<Text style={{ color: 'skyblue' }}> *</Text></Text>
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
                                                            onSubmitEditing={ onRegister }

                                                            autoCapitalize="words"
                                                            autoCorrect={ false }
                                                        />
                                        </View>
                                        {/* Sexo */}
                                        <View style = {{ marginVertical:20}}>
                                              <Text>Sexo:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                              <UseGenderComponent onPress={ onSelectTrigger }/> 
                                        </View>
                                        {/* Cedula */}
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
                                                                    onSubmitEditing={ onRegister }

                                                                    autoCapitalize="words"
                                                                    autoCorrect={ false }
                                                                />
                                        </View>  
                                        {/* email */}
                                        <View style = {{ marginVertical:20}}>
                                                <Text>Dirección de correo electrónico:<Text style={{ color: 'skyblue' }}> *</Text></Text>
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
                                                    onSubmitEditing={ onRegister }


                                                    autoCapitalize="none"
                                                    autoCorrect={ false }
                                                />
                                        </View>
                                        {/* Fecha de nacimiento */}
                                        <View style = {{ marginVertical:20}}>
                                            <Text>Fecha de nacimiento:</Text>
                                            <CalendarFigmaComponent onDateSelection= {(value) => onDateSelection(value)}/>
                                        </View>
                                        {/* estado */}
                                        <View style = {{ marginTop:5}}>
                                                <Text  style={[ 
                                                        comunStylesFigma.inputField,
                                                        ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                    ]}>{estado}</Text>

                                                 {/* Devuelve el item y propiedad a la funcion getValor que tengo actualmente 
                                                     Propiedad puede ser estado o  municipio para ver que se va  allenar
                                                     Aqui la p[ropiedad es estados]
                                                 */}
                                                {isVisible && (<ModalCitiesComponent getValor = { ( item, propiedad ) => getValor( item, propiedad )}
                                                                                      propiedad = 'estado' 
                                                                                    />
                                                                )
                                                }    
                                                <TouchableOpacity
                                                    style={[
                                                        {marginTop:10},
                                                        (Platform.OS === 'ios') && comunStylesFigma.inputFieldIOS,
                                                        { backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
                                                    ]}
                                                    onPress={() => showModal()}
                                                    >
                                                    <Text style={ { color:'white'} }>Estado:</Text>
                                                </TouchableOpacity>
                                        </View>  
                                        {/* Municipio */}
                                        { estado && ( <View style = {{ marginTop:5}}>
                                                                            <Text  style={[ 
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
                                                                                    {marginTop:10},
                                                                                    (Platform.OS === 'ios') && comunStylesFigma.inputFieldIOS,
                                                                                    { backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
                                                                                ]}
                                                                                onPress={() => showModalMunicipio(true)}
                                                                                >
                                                                                <Text style={{ color: 'white' }}> Municipio</Text>
                                                                                </TouchableOpacity>
                                                       </View>    )}  

                                         {/* Parentesco                      */}
                                        <View style = {{ marginVertical:20}}>
                                              <Text>Parentesco:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                              <UseGenderComponent onPress={ onSelectTrigger }/> 
                                        </View>
                                        <View style = { styles.globalBottom }></View>
                          </View>
                         
                        </TouchableWithoutFeedback>
              </ScrollView>     
            {/* {isVisible && (<ModalMessageComponent getValor={() => cerrarModal()}
              message={`${message}`}
            />)} */}
          </View>
        </View>
      </KeyboardAvoidingView>




    </>
  )
}


const styles = StyleSheet.create({
  globalMargin: {
      marginHorizontal: 20
  },
  globalBottom: {
    marginBottom: 100
}
});