import React from 'react';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { Dependent } from '../../../infrastructure/interfaces/dependent-interface';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { PagesScreenStatus } from '../../../infrastructure/interfaces/screens.status';
import { useVaccines } from '../../hooks/useVaccines';
import { stylesFigma } from '../../screens/theme/appFigmaTheme';
import { StyleSheet, View, ViewProps } from 'react-native';
import { MyIcon } from '../ui/MyIcon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DependentConsultDeleteCard } from './DependentConsultDeleteCard';


interface Props {
    goPage: PagesScreenStatus;
    dependent: Dependent;
    onDeleteRow? : (idRow: string)=> void;
}


 

 

export const DependentCard = ( { dependent, goPage = 'DependentAddEditScreen', onDeleteRow}:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
 

//   <View style={{ marginLeft: 0 }}>
//   <Text style={styles.strong}>{ obj.name + ' ' + obj.lastname}</Text>
//   <Text style={styles.name}>{'Perfil ' + (obj.isUser?'Primario':'Secundario')}</Text>
// </View>

  return (
    <Layout  style={{flex:1}}>
    
      {(goPage==='DependentAddEditScreen') && <DependentConsultDeleteCard 
                                          onDeleteRow = { onDeleteRow }
                                          dependent ={ dependent }
                                      />
                                    }

      {(goPage==='ApplyVaccinesAddScreen') && <Card 
                                      style={{flex:1}}
                                          onPress = { () => {
                                          
                                        
                                           return navigation.navigate('ApplyVaccinesAddScreen',{ dependentId: dependent?._id.$oid})
                                        }}
                                        header={() =>  <Text></Text>}
                                      >
                                          <Layout style={{flex:1, flexDirection:"row", justifyContent:'space-between', alignItems:'center' }}>
                                              <Text style={{marginLeft:10}}>{ dependent?.name  + ' ' + dependent?.lastname}</Text>
                                              <Text style={stylesFigma.titlesecund}></Text>
                                              <Ionicons name="eyedrop-outline" size={20} color="black" />
                                          </Layout>
                                          
                                      </Card>}     
      {(goPage==='ConsultVaccinesScreen') && <Card 
                                      style={{flex:1}}
                                          onPress = { () => {
                                            // Cargamos las vacunas de ese familiar
                                          
                                            return navigation.navigate('ConsultVaccinesScreen',{ dependentId: dependent._id.$oid})
                                        }}
                                        header={() =>  <Text></Text>}
                                      >
                                          <Layout style={{flex:1, flexDirection:"row", justifyContent:'space-between', alignItems:'center' }}>
                                              <Text style={{marginLeft:10}}>{ dependent.name  + ' ' + dependent.lastname}</Text>
                                              <Text style={stylesFigma.titlesecund}></Text>
                                              <Ionicons name="medkit-outline" size={20} color="black" />
                                          </Layout>
                                          
                                      </Card>}     
      {(goPage==='CalendarVaccineByDependentScreen') && <Card 
                                      style={{flex:1}}
                                          onPress = { () => {
                                            // Cargamos las vacunas de ese familiar
                                          
                                            return navigation.navigate('CalendarVaccineByDependentScreen',{ dependentId: dependent._id.$oid})
                                        }}
                                        header={() =>  <Text></Text>}
                                      >
                                          <Layout style={{flex:1, flexDirection:"row", justifyContent:'space-between', alignItems:'center' }}>
                                              <Text style={{marginLeft:10}}>{ dependent.name  + ' ' + dependent.lastname}</Text>
                                              <Text style={stylesFigma.titlesecund}></Text>
                                              <Ionicons name="medkit-outline" size={20} color="black" />
                                          </Layout>
                                          
                                      </Card>}     

                                                                      
                                      

                                 
      
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