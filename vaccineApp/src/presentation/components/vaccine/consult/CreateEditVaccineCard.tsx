import React from 'react';
import { Button, Card, Layout, Text } from '@ui-kitten/components';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, View, ViewProps } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PagesScreenStatus, PagesVaccineScreenStatus } from '../../../../infrastructure/interfaces/screens.status';
import { Dependent } from '../../../../infrastructure/interfaces/dependent-interface';
import { useVaccines } from '../../../hooks/useVaccines';
import { RootStackParams } from '../../../navigation/StackNavigator';
import { stylesFigma } from '../../../screens/theme/appFigmaTheme';
import { Vaccine } from '../../../../domain/entities/VaccineEditCreateEntity';


interface Props {
    goPage: PagesVaccineScreenStatus;
    vaccine: Vaccine;
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

export const CreateEditVaccineCard = ( { vaccine, goPage = 'VaccineEditCreateScreen' }:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {   getVaccines } = useVaccines();
 

  return (
    <Layout  style={{flex:1}}>
      {(goPage==='VaccineEditCreateScreen') && <Card 
                                      style={{flex:1}}
                                          onPress = { () => {
                                            navigation.navigate('VaccineEditCreateScreen',{ vaccineId:  vaccine._id.$oid});
                                          //  console.log( vaccine._id.$oid );
                                          }}
                                      >
                                          <Text
                                              numberOfLines={ 2 }
                                              style ={{ textAlign:'left'}}
                                          >{ vaccine.name  }</Text>
                                           <Text style={stylesFigma.titlesecund}>{vaccine.description}</Text>
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