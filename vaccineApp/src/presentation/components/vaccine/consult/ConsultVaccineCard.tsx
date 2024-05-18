import React, { useEffect } from 'react';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
 
import { NavigationProp, useNavigation } from '@react-navigation/native';
 
 
 
import { StyleSheet, View, ViewProps } from 'react-native';
 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApplyVaccine } from '../../../../domain/entities/ConsultByIndependentEntity';
import { VaccineStatus } from '../../../../infrastructure/interfaces/vaccine.status';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { stylesFigma } from '../../../screens/theme/appFigmaTheme';
import { useVaccines } from '../../../hooks/useVaccines';
 


interface Props {
    goPage: VaccineStatus;
    applyVaccine: ApplyVaccine;
}


const Header = (props: ViewProps): React.ReactElement => (
  <View {...props}>
    <Text category='h6'>
      Maldives
    </Text>
    <Text category='s1'>
      By Wikipedia
    </Text>
  </View>
);

const Footer = (props: ViewProps): React.ReactElement => (
  <View
    {...props}
    // eslint-disable-next-line react/prop-types
    style={[props.style, styles.footerContainer]}
  >
    <Button
      style={styles.footerControl}
      size='small'
      status='basic'
    >
      CANCEL
    </Button>
    <Button
      style={styles.footerControl}
      size='small'
    >
      ACCEPT
    </Button>
  </View>
);

export const ConsultVaccineCard = ( { applyVaccine, goPage = 'vaccine' }:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const {   isShowDosis, getShowDosis, getOffDosis } = useVaccines();

  useEffect(() => {
    getOffDosis();
  }, [])

  const goPageChange = () => {
  
     getShowDosis()
  } 


   
 

//   <View style={{ marginLeft: 0 }}>
//   <Text style={styles.strong}>{ obj.name + ' ' + obj.lastname}</Text>
//   <Text style={styles.name}>{'Perfil ' + (obj.isUser?'Primario':'Secundario')}</Text>
// </View>

  return (
    <Layout  style={{flex:1}}>
      {(goPage==='vaccine' && !isShowDosis) && <Card 
                                      style={{flex:1}}
                                          onPress = { goPageChange }
                                      >
                                           
                                          <Text
                                              numberOfLines={ 2 }
                                              style ={{ textAlign:'left'}}
                                          >Nombre: { applyVaccine.dosis.vaccine.name  }</Text>
                                           <Text style={stylesFigma.titlesecund}>
                                            Previene:{'  ' + (applyVaccine.dosis.vaccine.disease_prevents)}</Text>
                                            <Text style={stylesFigma.titlesecund}>
                                            Decripción:{' ' + (applyVaccine.dosis.vaccine.description)}</Text>
                                      </Card>}

      {(isShowDosis) && <Card 
                                       style={{flex:1}}
                                       onPress = { goPageChange }
                                        header={() =>  <Text></Text>}
                                      >
                                        
                                              <Text
                                                  numberOfLines={ 2 }
                                                  style ={{ textAlign:'left'}}
                                              >Dosis: { applyVaccine.dosis.name  }</Text>
                                              <Text style={stylesFigma.titlesecund}>
                                                Lote:{'' + (applyVaccine.lote)}</Text>
                                                <Text style={stylesFigma.titlesecund}>
                                                Fecha:{'' + (applyVaccine.vaccination_date)}</Text>
                                                <Text style={stylesFigma.titlesecund}>
                                                Frecuencia:{'' + (applyVaccine.dosis.age_frequency)}</Text>
 
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