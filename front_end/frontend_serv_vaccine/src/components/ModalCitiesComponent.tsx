import React, { useState } from 'react'
import { KeyboardAvoidingView, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity, Modal, FlatList } from 'react-native';
import { PaisScreen } from '../hooks/usePaisScreen';
import { stylesFigma } from '../theme/appFigmaTheme';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { FlatListMenuItemFigma } from './FlatListMenuItemFigma';
import { HeaderTitleFigma } from './HeaderTitleFigmaComponent';
import { ItemSeparator } from './ItemSeparator';
import { Pais } from '../interfaces/appInterfaces';

interface Props1  {
    getValor: (menuItem:Pais, propiedad: string) => void;
    propiedad?: 'estado' | 'municipio';
    idEstado?: number;
}

export const ModalCitiesComponent = ( { getValor, propiedad = 'estado', idEstado = 0 }: Props1) => {

    const { estadosOfVenezuela, municipiosOfEstadosOfVenezuela } = PaisScreen(); 
    const [isVisible, setIsVisible] = useState(true);

    const enviarValor = (menuItem: Pais) => {
              setIsVisible(false);
              getValor( menuItem, propiedad);
          }
  return (
    <>
             <Modal
                                                animationType='fade'
                                                visible={ isVisible }
                                                transparent= {true}
                                                >
                                                {/** Background color negro */}
                                                <View style = {{
                                                    flex:1, 
                                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                                    justifyContent: 'center',
                                                    alignItems:'center'
                                                }}>

                                                        {/**  Contendido del modal */}
                                                        <View style ={{
                                                            width:350,
                                                            height:350,
                                                            backgroundColor: 'white',
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
                                                                    <View style={{flex:1, ...stylesFigma.globalMargin}}>
                                                                   { propiedad==='estado' && (
                                                                                    <FlatList
                                                                                    data={ estadosOfVenezuela()|| []}
                                                                                    renderItem={ ( { item } ) =><FlatListMenuItemFigma 
                                                                                                                    menuItem={ item } 
                                                                                                                    cerrarModal={ (value) => enviarValor(value)}
                                                                                                                    propiedad={'estado'}/>}
                                                                                    keyExtractor= { (item) => item.id_estado.toString()}
                                                                                    ListHeaderComponent = { () =>  <HeaderTitleFigma title="Estados" 
                                                                                                                    marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                                                                    stylesFigma={stylesFigma}
                                                                                                                    type='big'
                                                                                                                    marginBottom={20}
                                                                                                                    textAlign='center'
                                                                                                                    ></HeaderTitleFigma> }
                                                                                    ItemSeparatorComponent = { () => <ItemSeparator/> }
                                                                                    />
                                                                   )}  

                                                                    { propiedad==='municipio' && (
                                                                                    <FlatList
                                                                                    data={ municipiosOfEstadosOfVenezuela(idEstado)[0]?.municipios || [] }
                                                                                    renderItem={ ( { item } ) =><FlatListMenuItemFigma 
                                                                                                                        menuItem={ item } 
                                                                                                                        cerrarModal={ (value) => enviarValor(value)}
                                                                                                                        propiedad={'municipio'}/>}
                                                                                    keyExtractor= { (item) => Math.random().toString()}
                                                                                    ListHeaderComponent = { () =>  <HeaderTitleFigma title={`Municipios`}
                                                                                                                    marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                                                                    stylesFigma={stylesFigma}
                                                                                                                    type='big'
                                                                                                                    marginBottom={20}
                                                                                                                    textAlign='center'
                                                                                                                    ></HeaderTitleFigma> }
                                                                                    ItemSeparatorComponent = { () => <ItemSeparator/> }
                                                                                    />
                                                                   )}       
                                                                    </View>
                                                        </View>

                                                </View>
                                            </Modal>

      </>
      
  )
}
