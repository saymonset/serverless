import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Alert, Button, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from '../hooks/useForm';
import { WhiteLogo } from '../components/WhiteLogo';
import { BackgroundSendPhoneFigma } from '../components/BackgroundSendPhoneFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/sendPhoneFigmaTheme';
import {  SendPhonFigmaComponent } from '../components/SendPhonFigmaComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SendCodeFigmaComponent } from '../components/SendCodeFigmaComponent';
import { SeguridadFigmaComponent } from '../components/SeguridadFigmaComponent';


interface Props extends StackScreenProps<any, any> {}


export const SeguridadFigmaScreen = ({ navigation }: Props) => {

  const [isVisible, setIsVisible] = useState(false);
    
  const   onBack = async () => {
        Keyboard.dismiss();
        navigation.replace('SendCodeFigmaScreen')
    }

 
  return (
    <>
          {/* Background */} 
           <BackgroundSendPhoneFigma></BackgroundSendPhoneFigma>

           <View style={{ flexDirection: 'row',
                           justifyContent:'flex-start',
                           marginBottom:0, 
                           marginLeft:15,  
                           marginHorizontal:1, 
                           marginTop:( Platform.OS === 'ios') ? 30: 30 }}>
                <TouchableOpacity onPress={() => onBack() } style={{ marginTop: 0 }}>
                    <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
                </TouchableOpacity>
            </View>
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                
              <View style={ stylesFigma.formContainer }> 

                            <View style={{flex:1}}>
                                              <HeaderTitleFigma title="Seguridad" 
                                                                                      marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                                      stylesFigma={stylesFigma}
                                                                                      type='big'
                                                                                      marginBottom={20}
                                                                                      ></HeaderTitleFigma>
                                              <HeaderTitleFigma title="Contraseña" 
                                                                                                marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                                                marginBottom={(Platform.OS === 'ios') ? 10: 0}
                                                                                                stylesFigma={stylesFigma}
                                                                                                type='small'
                                                                                                textAlign='center' 
                                                                                                ></HeaderTitleFigma>
                                              
                                                <SeguridadFigmaComponent navigation = { navigation }></SeguridadFigmaComponent>
                                              
                                                      
                                                
                                      
                             </View>
                             
                          
              </View>  
            </KeyboardAvoidingView>   


            <Modal
             animationType='fade'
             visible={ isVisible }
             transparent= {true}
             >
            {/** Background color negro */}
            <View style = {{
                flex:1, 
                // height:100,
                // width:100,
                backgroundColor: 'rgba(0,0,0,0.3)',
                justifyContent: 'center',
                alignItems:'center'
            }}>

               {/**  Contendido del modal */}
              <View style ={{
                   width:350,
                   height:350,
                   backgroundColor: '#B0E2FF',
                   justifyContent:'center',
                   alignItems:'center',
                   shadowOffset:{
                    width:0,
                    height:10
                   },
                   shadowOpacity: 0.25,
                   elevation: 10,
                   borderRadius: 5
              }}>
                    <HeaderTitleFigma title="Hemos verificado tu cuenta" 
                                                                            marginTop={(Platform.OS === 'ios') ? 0: 0}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            marginBottom={20}
                                                                            ></HeaderTitleFigma>
                    <TouchableOpacity
                                activeOpacity={ 0.8 }
                                style={{...stylesFigma.button, alignItems:'center', marginTop:20}}
                                onPress={() => setIsVisible(false)}
                              >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar</Text>
                      </TouchableOpacity>
              </View>

            </View>
        </Modal>
       
    </>
  )
}
