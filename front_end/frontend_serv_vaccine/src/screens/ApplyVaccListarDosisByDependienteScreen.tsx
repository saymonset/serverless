import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { ApplyVaccinesComponent } from '../components/ApplyVaccinesComponent';
import {  NextPrevioPage } from '../interfaces';
import { beforedependentAddThunks, clearDependenThunks } from '../store/slices/dependent';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from './LoadingScreen';
import { useDependent } from '../hooks/useDependent';
import { SearchInputComponent } from '../components/SearchInputComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { useLogin } from '../hooks/useLogin';
import { ApplyVaccListarDosisByDependienteComponent } from '../components/ApplyVaccListarDosisByDependienteComponent';



const screenWidth = Dimensions.get("window").width;

export const ApplyVaccListarDosisByDependienteScreen =  () => {
            let { loadData, dependent_id  } = useApplyVaccines();
            const { top } = useSafeAreaInsets();
            let keyCounter = 0;
            const {  
                    total, 
                    limite, 
                    desde, 
                    currentPage, 
                    isLoading,
                    
                  } = useApplyVaccines();


                  const { token } = useLogin();

                  let { tableData  } = useApplyVaccines();

    

            
            const navigation = useNavigation();

          

            const addFamily = async ()=> {
             // handlerClearDependent();
                   
                  
            }

      

             const handlePreviousPage = () => {
            let limiteDesde ={
                limite,
                desde:desde-limite>=0?desde-limite:limite-desde
            }
            let prev: NextPrevioPage ={
              nextPage:'prev'
            }
            loadData(limiteDesde, currentPage,  prev, token, dependent_id)
          };
          const handleNextPage  = () => {
            let limiteDesde ={
                limite,
                desde:desde+limite
            }

            let next: NextPrevioPage ={
              nextPage:'next'
            }
            //  console.log('handle nexty ??? ')
            loadData(limiteDesde, currentPage,  next, token, dependent_id)
          };

           
  return (
    <View style={styles.container}>
    <View style={[styles.card, { marginTop: 10, marginBottom: (Platform.OS==='ios') ? 40 : 0 }]}>
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
                 {  ( isLoading ) && <LoadingScreen /> }
                
                 <SearchInputComponent
                    onDebounce={(value) => console.log(value)}
                    style={{
                      position: 'absolute',
                      zIndex: 999,
                      width: screenWidth - 40,
                      top: (Platform.OS === 'ios') ? top : top + 30
                    }} 
                     goPage={"ApplyVaccinesScreen"} ></SearchInputComponent>
                   
                    <FlatList
                            data={tableData}
                            keyExtractor={() => {
                              keyCounter++;
                              return keyCounter.toString();
                            }}
                            showsHorizontalScrollIndicator={true}
                            numColumns={1}
                            horizontal={false}
                            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgray'}} />}
                            ListHeaderComponent={  <HeaderTitleFigma title={`Listar Dosis por dependiente`}
                            marginTop={(Platform.OS === 'ios') ? 120: 120}
                            stylesFigma={stylesFigma}
                            type='big'
                            
                            marginBottom={20}
                            textAlign='center'
                            ></HeaderTitleFigma> }
                            
                            renderItem={({ item }) => (
                              <View style={{marginBottom:10,
                                            marginTop:5}}>
                                <ApplyVaccListarDosisByDependienteComponent applyVaccine={item}
                                                       applyVaccinePerson = {  (id:string) => console.log(id)} />
                              </View>
                            )}
                          />
                        
                   {/* Controles del paginador */}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:20, marginBottom:(Platform.OS === 'ios') ? 0: 10 }}>
                  <Button title="Anterior" onPress={handlePreviousPage} disabled={currentPage === 1 || isLoading} />
                  <Text style={{ marginHorizontal: 10, color:'white' }}>Página {currentPage} / { Math.ceil(total / limite ) }</Text>
                  <Button title="Siguiente" onPress={handleNextPage} disabled={currentPage === Math.ceil(total / limite ) ||isLoading} />
                </View>
       </View>
      </View>
  </View>
  )
}



export const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 2,
  },
  card: {
    flex: 1,
    //backgroundColor: 'lightblue',
    borderRadius: 10,
  },
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
