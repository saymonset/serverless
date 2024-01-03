import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { PerfilFigmaComponent } from '../components/PerfilFigmaComponent';
import { NextPrevioPage } from '../interfaces';
import { loadDataThunks } from '../store/slices/dependent';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/appFigmaTheme';

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


    const handlePreviousPage = () => {
      let limiteDesde ={
          limite,
          desde:desde-limite>=0?desde-limite:limite-desde
      }
      let prev: NextPrevioPage ={
        nextPage:'prev'
      }
      loadData(limiteDesde, prev)
    };
    const handleNextPage  = () => {
      let limiteDesde ={
          limite,
          desde:desde+limite
      }

      let next: NextPrevioPage ={
        nextPage:'next'
      }
      loadData(limiteDesde, next)
    };
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
                          <Text style = {{ ...comunStylesFigma.hola}}></Text>
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
                    onEndReached= { handleNextPage }
                    onEndReachedThreshold = { 1 }
                    ListHeaderComponent={  <HeaderTitleFigma title={`Perfiles`}
                    marginTop={(Platform.OS === 'ios') ? 40: 40}
                    stylesFigma={stylesFigma}
                    type='big'
                    marginBottom={20}
                    textAlign='center'
                    ></HeaderTitleFigma> }
                    
                    renderItem={({ item }) => (
                      <View style={{marginBottom:10,
                                    marginTop:5}}>
                        <PerfilFigmaComponent obj={item} />
                      </View>
                    )}
                  />

                     {/* Controles del paginador */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:20 }}>
        <Button title="Anterior" onPress={handlePreviousPage} disabled={currentPage === 1 || isLoading} />
        <Text style={{ marginHorizontal: 10, color:'white' }}>Página {currentPage} / { Math.ceil(total / limite ) }</Text>
        <Button title="Siguiente" onPress={handleNextPage} disabled={currentPage === Math.ceil(total / limite ) ||isLoading} />
      </View>

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

