import React from 'react'
import { Text, View, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { MenuItem } from '../interfaces/appInterfaces';
import { styles } from '../theme/appTheme';
import { FlatListMenuItem } from '../components/FlatListMenuItem';
import { HeaderTitle } from '../components/HeaderTitle';
import { menuItems } from '../data/menuItems';
import { itemSeparator, ItemSeparator } from '../components/ItemSeparator';







 
export const HomeScreen = () => {

  
 


 

  return (
    <View style={{flex:1, ...styles.globalMargin}}>
       
        <FlatList
            data={ menuItems }
            renderItem={ ( { item } ) =><FlatListMenuItem menuItem={ item}/>}
            keyExtractor= { (item) => item.name}
            ListHeaderComponent = { () => <HeaderTitle title="Opciones de Menu"></HeaderTitle> }
            ItemSeparatorComponent = { () => <ItemSeparator/> }
        />
    </View>
  )
}
