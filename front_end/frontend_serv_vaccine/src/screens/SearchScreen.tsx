import React, { useEffect, useState } from 'react'
import { Text, View, Platform, StyleSheet, FlatList, Dimensions } from 'react-native';
import { BackePageComponente } from '../components/BackePageComponente';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInputComponent } from '../components/SearchInputComponent';
import { useSearch } from '../hooks/useSearch';
import { ActivityIndicator } from 'react-native-paper';
import { NextAppointmentsComponent } from '../components/NextAppointmentsComponent';
import { LoadingScreen } from './LoadingScreen';
import { NextAppointments } from '../interfaces/nextAppointments-interfaces';

const screenWidth = Dimensions.get("window").width;

export const SearchScreen = () => {
    let keyCounter = 0;
    
    const { top } = useSafeAreaInsets();
    const { isFetching, data} = useSearch();

     const [dataFiltred, setDataFiltred] = useState<NextAppointments[]>([]);

    const [ term, setTerm ] = useState('');

    useEffect(() => {
     
     if (term.length === 0 ) {
          return setDataFiltred([]);
     }


      setDataFiltred(
        data.filter(
           ( item ) => item.name.toLowerCase().includes( term.toLowerCase() ))
      );
    
      
    }, [term])
    

    console.log({isFetching})
    if ( isFetching ){
        return (
         <LoadingScreen></LoadingScreen>
        )
    }else{
      console.log({data})
    }
  return (
    <View style={{flex:1,
                  marginTop: (Platform.OS==='ios')?top:top + 10,
                  marginHorizontal:20,
                  }}>
        {/**  Boton regreso */}
        <SearchInputComponent
                      onDebounce = { ( value ) => setTerm( value )}
                      style={{
                        position:'absolute',
                        zIndex:999,
                        width:screenWidth - 40,
                        top: (Platform.OS==='ios') ?  top : top + 30

                      }}
        ></SearchInputComponent>

        <FlatList
                      data={dataFiltred}
                      keyExtractor={() => {
                        keyCounter++;
                        return keyCounter.toString();
                      }}
                      showsHorizontalScrollIndicator={true}
                      numColumns={1}
                      horizontal={false}
                      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgray'}} />}
                       // Header
                      ListHeaderComponent={(
                        <Text style={{
                            ...styles.title,
                            ...styles.globalMargin,
                            top: (Platform.OS==='ios') ?  top + 130 : top + 160,
                            marginBottom: (Platform.OS==='ios') ?  top + 140 : top + 170,
                            paddingBottom: 10
                        }}> { term } </Text>
                    )}
                      renderItem={({ item }) => (
                        <View style={{marginBottom:10,
                                      marginTop:5}}>
                          <NextAppointmentsComponent nextAppointments={item} />
                        </View>
                      )}
                    />
    </View>
  )
}

export const styles = StyleSheet.create({
  globalMargin: {
      marginHorizontal: 20
  },
  title: {
      fontSize: 35,
      fontWeight: 'bold'
  }
});
