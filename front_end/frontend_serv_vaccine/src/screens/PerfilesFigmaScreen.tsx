import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { FlatList, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { PerfilFigmaComponent } from '../components/PerfilFigmaComponent';
import { usePerfilFigma } from '../hooks/usePerfilFigma';
import { NextPrevioPage } from '../interfaces';
import { loadDataThunks } from '../store/slices/dependent';
import { comunStylesFigma } from '../theme/comunFigmaTheme';

export const PerfilesFigmaScreen = () => {
  let keyCounter = 0;

  const {  usuario:{ token }  } = useSelector((state: store) => state.loginStore);
  const { message, resp, tableData, total, limite, desde, currentPage, isLoading, isDelete, dependentsResume } = useSelector( (state: store ) => state.dependentStore);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const addFamily = ()=> {
         navigation.navigate( 'PerfilFigmaAddScreen' as never)
  }

   {/** LLenar data */}
const loadData = async(limiteDesde: DesdeLimite, nextPrev: NextPrevioPage) => {
  await dispatch(loadDataThunks( limiteDesde, currentPage, nextPrev, token ));
}
  useEffect(() => {
    let limiteDesde ={
         limite,
         desde
    }
    let none: NextPrevioPage ={
      nextPage:'none'
    }
    loadData(limiteDesde, none)
  }, [ ])
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
                    data={dependentsResume}
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

