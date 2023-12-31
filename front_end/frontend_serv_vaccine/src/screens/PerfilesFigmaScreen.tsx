import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { FlatList, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { PerfilFigmaComponent } from '../components/PerfilFigmaComponent';
import { usePerfilFigma } from '../hooks/usePerfilFigma';
import { comunStylesFigma } from '../theme/comunFigmaTheme';

export const PerfilesFigmaScreen = () => {
  let keyCounter = 0;


  const { lista, isLoading } = usePerfilFigma();

  const navigation = useNavigation();

  const addFamily = ()=> {
         navigation.navigate( 'PerfilFigmaAddScreen' as never)
  }
return (
  <View style = {{ ... styles.globalMargin,
                       alignItems:'center',
                       flex:1, 
                       backgroundColor:'white'}}>
                    <View style={{
                                  ...styles.search
                                  }}>
                          <Text style = {{ ...comunStylesFigma.hola}}>Perfiles</Text>
                          <View style = {{ flex: 1 }} />
                          {/* Flecha de busqueda */}

                          {/* Agregamos usuario */}
                          <TouchableOpacity 
                                onPress={()=> addFamily()}
                                activeOpacity={0.9}>
                                <Icon
                                    name = "add-circle-outline"
                                    color = "black"
                                    size = { 40 }
                                />
                           </TouchableOpacity>     
                    </View> 
                  
                      
             
             <FlatList
                    data={lista}
                    keyExtractor={() => {
                      keyCounter++;
                      return keyCounter.toString();
                    }}
                    showsHorizontalScrollIndicator={true}
                    numColumns={1}
                    horizontal={false}
                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgray'}} />}
                    renderItem={({ item }) => (
                      <View style={{marginBottom:10,
                                    marginTop:5}}>
                        <PerfilFigmaComponent obj={item} />
                      </View>
                    )}
                  />

  </View>
)
}


export const styles = StyleSheet.create({
globalMargin: {
  marginHorizontal: 0,
  alignItems:'center',
  justifyContent:'center',
  flex:1, 
  backgroundColor:'white'
},
title: {
    fontSize: 35,
    fontWeight: 'bold'
},
search: {
  flexDirection:'row',  
  justifyContent: 'center',
  alignItems:'center',
   marginHorizontal:10
}
});

