import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, View, ScrollView, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity, Modal, FlatList } from 'react-native';
import { PaisScreen } from '../hooks/usePaisScreen';
import { stylesFigma } from '../theme/appFigmaTheme';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { FlatListMenuVaccineDosis } from './FlatListMenuVaccineDosis';
import { HeaderTitleFigma } from './HeaderTitleFigmaComponent';
import { ItemSeparator } from './ItemSeparator';
import { Pais } from '../interfaces/appInterfaces';
import { AuthContext } from '../context/AuthContext';
import { Dosiss } from '../interfaces';
import { Vaccine } from '../interfaces/vaccine-withdosis-for-dependent-interfaces';
import { useVaccine } from '../hooks/useVaccine';
import { useApplyVaccines } from '../hooks/useApplyVaccines';

interface Props1  {
    getValor: (menuItem:Dosiss | Vaccine, propiedad: string) => void;
    propiedad?: 'parent' | 'child';
    idParent?: string;
    onCerrarModal  : (resp:boolean ) => void;
}

export const ModalVaccineDosisComponent = ( { getValor, propiedad = 'parent', idParent = '', onCerrarModal }: Props1) => {

      // Sacamos del contexto donde se inicializa estos valores apenas entreen el tab1 de la navigator y este logueadio
    //const { authState:{dosis, vaccines} } = useContext(AuthContext)
    const [isVisible, setIsVisible] = useState(true);
    const {  vaccines } =  useVaccine();
    const {  dosis } =  useApplyVaccines();

    const getRandomKey = () => Math.random().toString();


    const enviarValor = (menuItem: Dosiss | Vaccine ) => {
                 setIsVisible(false);
            //   El que llamo este metodo dependiendo de lo que tenag la propiedad actua pra su logica
                getValor( menuItem, propiedad);
    }
 
    const cerrarModalEnX = () => {
        onCerrarModal(true);
   }

   useEffect(() => {
 
   }, [])
   

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
                                                              <TouchableOpacity
                                                                        activeOpacity={0.8}
                                                                        onPress = { () => {
                                                                            cerrarModalEnX();
                                                                        }
                                                                        }
                                                                        >
                                                                            <View style={{...stylesFigma.cierrepopup}}><Text>X</Text></View>
                                                                        </TouchableOpacity>
                                                                 
                                                                  
                                                                    <View style={{flex:1, ...stylesFigma.globalMargin}}>
                                                                    { propiedad==='parent' && (
                                                                                    <FlatList
                                                                                    data={ vaccines || []}
                                                                                    renderItem={ ( { item } ) =><FlatListMenuVaccineDosis 
                                                                                                                    menuItem={ item } 
                                                                                                                    cerrarModal={ (value) => enviarValor(value)}
                                                                                                                    propiedad={'parent'}/>}
                                                                                                                    keyExtractor={getRandomKey}
                                                                                    ListHeaderComponent = { () =>  <HeaderTitleFigma title="Vacunas" 
                                                                                                                    marginTop={(Platform.OS === 'ios') ? 40: 40}
                                                                                                                    stylesFigma={stylesFigma}
                                                                                                                    type='big'
                                                                                                                    marginBottom={20}
                                                                                                                    textAlign='center'
                                                                                                                    ></HeaderTitleFigma> }
                                                                                    ItemSeparatorComponent = { () => <ItemSeparator/> }
                                                                                    />
                                                                   )}  

                                                                   
                                                                    { propiedad==='child' && (
                                                                                    <FlatList
                                                                                    data={ dosis?.filter((d: Dosiss) => d.vacinne_id === String(idParent)) || []  }
                                                                                    renderItem={ ( { item } ) =><FlatListMenuVaccineDosis 
                                                                                                                        menuItem={ item } 
                                                                                                                        cerrarModal={ (value) => enviarValor(value)}
                                                                                                                        propiedad={'child'}/>}
                                                                                                                        keyExtractor={getRandomKey}
                                                                                    ListHeaderComponent = { () =>  <HeaderTitleFigma title={`Dosis`}
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


