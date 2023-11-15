import React, { useState } from 'react'
import { View, ScrollView, RefreshControl } from 'react-native'
import { HeaderTitle } from '../components/HeaderTitle'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PullToRefreshScreen = () => {

  const { top } = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState<string>();

  const onRefresh = (() => {

    setRefreshing(true);

    setTimeout(() => {
      console.log('Terminamos');
      setRefreshing(false);
      setData('Hola Mundo');
    }, 3500);
          
  });

  return (
    <ScrollView
           style ={{
            marginTop: refreshing ? top : 0
           }}
           refreshControl={
                   <RefreshControl
                      refreshing = { refreshing }
                      onRefresh = {onRefresh}
                      progressBackgroundColor="#5856D6"
                    //  progressViewOffset = { 10 }
                    colors= { ['white', 'red', 'orange']}
                   // style={{ backgroundColor: '#5856D6'}}
                   // tintColor="white"
                   />
           }
    >
            <View style={styles.globalMargin}>
                <HeaderTitle title="Pull to refresh"></HeaderTitle>
                {
                  data && <HeaderTitle title= { data }></HeaderTitle>
                }

            </View>
    </ScrollView>
  
  )
}
