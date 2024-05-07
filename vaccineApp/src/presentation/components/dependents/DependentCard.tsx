 
import { Card, Layout, Text } from '@ui-kitten/components';
import { Dependent } from '../../../infrastructure/interfaces/dependent-interface';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';
import { PagesScreenStatus } from '../../../infrastructure/interfaces/screens.status';
import { useVaccines } from '../../hooks/useVaccines';

interface Props {
    goPage: PagesScreenStatus;
    dependent: Dependent;
}

export const DependentCard = ( { dependent, goPage = 'DependentScreen' }:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {   getVaccines } = useVaccines();

  return (
    <Layout  style={{flex:1}}>
      {(goPage==='DependentScreen') && <Card 
                                      style={{flex:1}}
                                          onPress = { () => navigation.navigate('DependentScreen',{ dependentId: dependent._id.$oid})}
                                      >
                                          <Text
                                              numberOfLines={ 2 }
                                              style ={{ textAlign:'center'}}
                                          >{ dependent.name}</Text>
                                      </Card>}

      {(goPage==='ApplyVaccinesAddScreen') && <Card 
                                      style={{flex:1}}
                                          onPress = { () => {
                                            // Cargamos las vacunas de ese familiar
                                           getVaccines(dependent._id.$oid);
                                            return navigation.navigate('ApplyVaccinesAddScreen',{ dependentId: dependent._id.$oid})
                                        }}
                                      >
                                          <Text
                                              numberOfLines={ 2 }
                                              style ={{ textAlign:'center'}}
                                          >{ dependent.name}</Text>
                                      </Card>}                                      
      
    </Layout>
  )
}