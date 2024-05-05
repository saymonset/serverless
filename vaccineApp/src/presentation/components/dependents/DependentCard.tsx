 
import { Card, Layout, Text } from '@ui-kitten/components';
import { Dependent } from '../../../infrastructure/interfaces/dependent-interface';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props {
    dependent: Dependent;
}

export const DependentCard = ( { dependent }:Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Layout  style={{flex:1}}>
      <Card 
        style={{flex:1}}
        onPress = { () => navigation.navigate('DependentScreen',{ dependentId: dependent._id.$oid})}
        >
            <Text
                numberOfLines={ 2 }
                style ={{ textAlign:'center'}}
            >{ dependent.name}</Text>
        </Card>
    </Layout>
  )
}