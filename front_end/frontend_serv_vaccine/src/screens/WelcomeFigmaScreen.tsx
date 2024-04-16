import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext } from 'react'
import {  Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { BackgroundFigma } from '../components/BackgroundFigma';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/appFigmaTheme';
import { AuthContext } from '../context/AuthContext';
import { STAGE, API_URL } from '@env';

interface Props extends StackScreenProps<any, any> {}


export const WelcomeScreen = ({ navigation }: Props) => {
      {/*  Cargamos data en el contexto */}
    const {   getGeneroRaltionSchipLoads } = useContext(AuthContext)

    const begin = ( ) => {
          {/*  Cargamos data en el contexto reduce*/}
          console.log({ API_URL, STAGE})
        getGeneroRaltionSchipLoads();
        navigation.replace('SendPhoneFigmaScreen')
    }
  
 
  return (
 
    <>
          {/* Background */} 
           <BackgroundFigma></BackgroundFigma>
  
  
           <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height' }
            >
               
                
              <View style={ stylesFigma.formContainer }> 

                            <View style={{flex:1}}>
                                    <HeaderTitleFigma title="Bienvenido" 
                                                                            marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                            stylesFigma={stylesFigma}
                                                                            type='big'
                                                                            ></HeaderTitleFigma>
                                        <HeaderTitleFigma title="Registra tu información médica, accede a ella siempre que lo necesite" 
                                                                            marginTop={(Platform.OS === 'ios') ? -5: -5}
                                                                            stylesFigma={stylesFigma}
                                                                            type='small'
                                                                            ></HeaderTitleFigma>
                             </View>
              
                             <View style={{ ...stylesFigma.buttonContainer, flex:2, alignItems:'center', top:140 }}>
                                  <TouchableOpacity
                                      activeOpacity={ 0.8 }
                                      style={ stylesFigma.button }
                                       onPress={ () => {} }
                                  >
                                      <Image 
                                        source={ require('../assets/hola.png') }
                                        style={{
                                            width: 110,
                                            height: 100 
                                        }}
                                    />
                                  </TouchableOpacity>
                              </View>
                           
                           <View style={ {flex:1, marginBottom:40 }}> 
                            
                            
                                   {/* Crear una nueva cuenta */}
                              <View style={ {...stylesFigma.buttonContainer, top:30} }>
                                  <TouchableOpacity
                                      activeOpacity={ 0.8 }
                                      style={ stylesFigma.button }
                                       onPress={ () => begin() }
                                  >
                                      <Text style={ stylesFigma.buttonText } >Comienza ahora</Text>
                                  </TouchableOpacity>
                              </View>
                           {/* Boton login */}
                              <View style={ stylesFigma.buttonContainer  }>
                                  <TouchableOpacity
                                      activeOpacity={ 0.8 }
                                      onPress={ () => navigation.replace('LoginFigmaScreen') }
                                  >
                                      <Text style={ [stylesFigma.buttonTextBlack ] }>Inicia sessión</Text>
                                  </TouchableOpacity>
                              </View>
                           </View>
              </View>  
            </KeyboardAvoidingView>   
       
    </>
  )
}
