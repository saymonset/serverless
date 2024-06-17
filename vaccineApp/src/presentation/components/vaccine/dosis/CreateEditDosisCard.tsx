import React, { useEffect } from 'react';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Alert, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PagesScreenStatus, PagesVaccineScreenStatus } from '../../../../infrastructure/interfaces/screens.status';
import { Dependent } from '../../../../infrastructure/interfaces/dependent-interface';
import { useVaccines } from '../../../hooks/useVaccines';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { stylesFigma } from '../../../screens/theme/appFigmaTheme';
import { DosisEntity, Vaccine } from '../../../../domain/entities/VaccineEditCreateEntity';


interface Props {
    goPage: PagesVaccineScreenStatus;
    dosis: DosisEntity;
    onDelete: (idDelete:string)=> void
}


export const CreateEditDosisCard = ( { dosis, goPage = 'DosisEditCreateScreen', onDelete }:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
 //Este nombre se coloca apenas selecciones un dosis de la vacuna 
  const { putNameVaccineSelect } = useVaccines();
  
    useEffect(() => {
       //Este nombre se coloca apenas selecciones un dosis de la vacuna 
        putNameVaccineSelect(dosis);
    }, [dosis.vaccineName])
  
 

  return (
    <Layout  style={{flex:1}}>
      {(goPage==='DosisEditCreateScreen') && <Card 
                                    
                                      style={{flex:1}}
                                          onPress = { () => {
                                            navigation.navigate('DosisEditCreateScreen',{ dosisId:  dosis._id.$oid});
                                          //  console.log( vaccine._id.$oid );
                                          }}
                                      >
                                            

                                            <Text category='h3'
                                                  numberOfLines={ 2 }
                                                  style ={{ textAlign:'left'}}
                                              >Vacuna: { dosis.vaccineName ?? ''  }</Text>

                                            <Text category='h6'
                                                  numberOfLines={ 2 }
                                                  style ={{ textAlign:'left'}}
                                              >Dosis: { dosis.name  }</Text>
                                              
                                             
                                                <Text category='s1' style={stylesFigma.titlesecund}>
                                                Edad para la aplicacion de la vacuna : <Text>{'' + (dosis.age_frequency)}</Text></Text>
                                             
                                                <Text category='s1' style={stylesFigma.titlesecund}>
                                                Número de dias para aplicar al familiar:{'' + (dosis.expires_in_days)}</Text>

                                                <Text  category='s2' style={stylesFigma.titlesecund}>
                                               Número de columna en el reporte:{'' + (dosis.columReporte)}</Text>

                                                <Text category='s1' style={stylesFigma.titlesecund}>
                                                Número de fila en el reporte:{'' + (dosis.rowReporte)}</Text>

                                                
                                                <Layout style={{ marginLeft: 280 }}> 
                                                    <Pressable onPress={ () => 
                                                      onDelete (dosis._id.$oid)
                                                    }>
                                                            <Ionicons name="trash" size={20} color="red" />
                                                    </Pressable>
                                                </Layout>
                                          
                                      </Card>
                                      
                                      
                                      
                                      }
 
                                     
    </Layout>
  )
}



const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});