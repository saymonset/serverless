import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { BackgroundSendPhoneFigma } from '../components/BackgroundSendPhoneFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
 
import { ModalMessageComponent } from '../components/ModalMessageComponent';
import { useNavigation } from '@react-navigation/native';
import { ApplyVaccine, Dosiss } from '../interfaces';
import {  comunStylesFigma } from '../theme/comunFigmaTheme'
import { CalendarFigmaComponent } from '../components/CalendarFigmaComponent';
import { ModalVaccineDosisComponent } from '../components/ModalVaccineDosisComponent';
import { LoadingScreen } from './LoadingScreen';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { Vaccine } from '../interfaces/vaccine-interfaces';


export const ApplyVaccinesConsultationScreen = () => {

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleParent, setIsVisibleParent] = useState(false);
  const [isVisibleChild, setIsVisibleChild] = useState(false);
  const [idParent, setIdParent] = useState('');
  const [idDosis, setIdDosis] = useState('');
  const [parentName, setParentName] = useState('');
  const [child, setChild] = useState("");
  const {  usuario:{ token } } = useSelector((state: store) => state.loginStore);
 

   

  let { _id, 
        lote, 
        image, 
        dosis_id, 
        vaccination_date,
        useApplyVaccineAddModify,
        resp,
        dependent_id,
        total, isLoading, message,
        handlerRemoveMessageApplyVaccine,
        onChange,} = useApplyVaccines();

  const navigation = useNavigation();
  const onBack = async () => {
    Keyboard.dismiss();
    navigation.navigate('HomeFigmaTabRootScreen' as never)
  }

  

  const cerrarModal = () => {
    setIsVisible(false);
    //Borramos mensajes del thrunk
    handlerRemoveMessageApplyVaccine();

  /* The above code appears to be written in TypeScript and React. It seems to be commented out code that is checking if a variable "resp" is truthy. If it is, it may be navigating to a screen called 'HomeFigmaTabRootScreen' using the "navigation" object. However, the code is currently commented out, so it is not being executed. */
    if (resp) {
       navigation.navigate('ApplyVaccinesListScreen' as never)
    }
  }

  const abrirModal = () => {
    setIsVisible(true);
  }

    
 
  useEffect(() => {
    if (message?.length === 0) return;
       abrirModal();
   }, [message])

  useEffect(() => {
   //seteamos de  que parentName es o ciudad
    // setParentName(state);
    // setChild(city);
  }, [])

  const showModalEstado = async () => {
    setIsVisibleParent(true);
  }

  const showModalMunicipio = async () => {
    setIsVisibleChild(true);
  }

  const getValor = (menuItem: Dosiss | Vaccine, propiedad: any) => {
    if (propiedad === 'parent') {
      setIsVisibleParent(false);
      const id : string = menuItem?._id?.$oid ?? "";
      setIdParent(id)
      setParentName(`${menuItem.name}`)
      setChild('');
    }
    if (propiedad === 'child') {
      const idDosis : string = menuItem?._id?.$oid ?? "";
      setIdDosis(idDosis)
      setIsVisibleChild(false);
      setChild(`${menuItem.name}`);
    }
  }
 
  const onAddOrEdit = async () => {
    Keyboard.dismiss();
    let obj = {
        _id,
        lote, 
        image, 
        dosis_id:idDosis, 
        dependent_id,  
        vaccination_date,
        status:true
    };
    let applyVaccine: ApplyVaccine = { ...obj };
    console.log({ applyVaccine })
    useApplyVaccineAddModify(applyVaccine, token, total);
 
  }

  const onDateSelection = (date: Date) => {
    onChange(date, 'vaccination_date')
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
        marginTop: 30
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
            <HeaderTitleFigma 
              title={_id ? "Editar familiar" : "Aplicar Vacuna"}
              marginTop={(Platform.OS === 'ios') ? 40 : 40}
              stylesFigma={stylesFigma}
              type='big'
              marginBottom={0}
            ></HeaderTitleFigma>
                <ScrollView>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                          <View style = { styles.globalMargin }>        
                                        <View style = {{ marginVertical:20}}>
                                            <Text>Lote:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                            <TextInput 
                                                placeholder="Enter your lote:"
                                                placeholderTextColor="rgba(0,0,0,0.4)"
                                                underlineColorAndroid="rgba(0,0,0,0.4)"
                                                style={[ 
                                                    comunStylesFigma.inputField,
                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                ]}
                                                selectionColor="white"
                                                onChangeText={ (value) => onChange(value, 'lote') }
                                                value={ lote }
                                                onSubmitEditing={ onAddOrEdit }
                                                autoCapitalize="words"
                                                autoCorrect={ false }
                                            />
                                        </View> 
                                        <View style = {{ marginVertical:20}}>
                                                        <Text>Image:<Text style={{ color: 'skyblue' }}> *</Text></Text>
                                                        <TextInput 
                                                            placeholder="Enter the image:"
                                                            placeholderTextColor="rgba(0,0,0,0.4)"
                                                            underlineColorAndroid="rgba(0,0,0,0.4)"
                                                            style={[ 
                                                                comunStylesFigma.inputField,
                                                                ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                            ]}
                                                            selectionColor="white"
                                                            onChangeText={ (value) => onChange(value, 'image') }
                                                            value={ image }
                                                            onSubmitEditing={ onAddOrEdit }
                                                            autoCapitalize="words"
                                                            autoCorrect={ false }
                                                        />
                                        </View>
                                        
                                     
                                        {/* Fecha de nacimiento */}
                                        <View style = {{ marginVertical:20}}>
                                            <Text>Fecha de vacunación:</Text>
                                            <CalendarFigmaComponent onDateSelection= {(value: any) => onDateSelection(value)}/>
                                        </View>

                                       
                                        {/* parentName */}
                                        <View style = {{ marginTop:5}}>
                                                <Text  style={[ 
                                                        comunStylesFigma.inputField,
                                                        ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                    ]}>{parentName}</Text>

                                                 {/* Devuelve el item y propiedad a la funcion getValor que tengo actualmente 
                                                     Propiedad puede ser parentName o  child para ver que se va  allenar
                                                     Aqui la p[ropiedad es parentNames]
                                                 */}
                                                   {/* En showModalEstado es donde  colocamos visible el isVisibleParent a true */}
                                                {isVisibleParent && (<ModalVaccineDosisComponent getValor = { ( item, propiedad ) => getValor( item, propiedad )}
                                                                                      propiedad = 'parent' 
                                                                                    />
                                                                )
                                                }    
                                                <TouchableOpacity
                                                    style={[
                                                        {marginTop:10},
                                                        (Platform.OS === 'ios') && comunStylesFigma.inputFieldIOS,
                                                        { backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
                                                    ]}
                                                    // En showModalEstado es donde  colocamos visible el isVisibleParent a true
                                                    onPress={() => showModalEstado()}
                                                    >
                                                    <Text style={ { color:'white'} }>Vacunas:</Text>
                                                </TouchableOpacity>
                                        </View>  
                                        {/* Municipio */}
                                        { parentName && ( <View style = {{ marginTop:5}}>
                                                                            <Text  style={[ 
                                                                                    ( Platform.OS === 'ios' ) && comunStylesFigma.inputFieldIOS
                                                                                ]}>{ child}</Text>

                                                                    {isVisibleChild && (<ModalVaccineDosisComponent getValor = { ( item, propiedad ) => getValor( item, propiedad )}
                                                                                                                  propiedad = 'child' 
                                                                                                                  idParent={ idParent}
                                                                                                    />
                                                                               )
                                                                     }    
                                                                            <TouchableOpacity
                                                                                style={[
                                                                                    {marginTop:10},
                                                                                    (Platform.OS === 'ios') && comunStylesFigma.inputFieldIOS,
                                                                                    { backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }
                                                                                ]}
                                                                                onPress={() => showModalMunicipio()}
                                                                                >
                                                                                <Text style={{ color: 'white' }}> Dosis</Text>
                                                                                </TouchableOpacity>
                                                       </View>    )}  
                                            {/* Crear una nueva cuenta */}
                                            <View style={{...comunStylesFigma.buttonContainer,  alignItems:'center', marginTop:10, marginBottom:50}  }>
                                                {  isLoading && (  <LoadingScreen />  )}
                                            <TouchableOpacity 
                                                     onPress= { onAddOrEdit} 
                                                     style={ {...comunStylesFigma.button} }
                                                    >
                                                   <Text style={ [comunStylesFigma.buttonText ] }>Guardar</Text>
                                            </TouchableOpacity>
                                        </View>
                          </View>
                        </TouchableWithoutFeedback>
              </ScrollView>     
            {isVisible && (<ModalMessageComponent getValor={() => cerrarModal()}
              message={`${message}`}
            />)}
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