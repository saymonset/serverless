import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Dimensions, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
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



const screenWidth = Dimensions.get("window").width;

export const ApplyVaccinesScreen =  () => {
            let { dependentById, editFalseDependent, isEdit  } = useApplyVaccines();
            const { top } = useSafeAreaInsets();
            const [ term, setTerm ] = useState('');
            let keyCounter = 0;
            const { initPerfiles, 
                    dataFiltred, 
                    loadData,
                    total, 
                    limite, 
                    desde, 
                    currentPage, 
                    isLoading,
                    handlerClearDependent
                  } = useDependent();
                  const { token } = useLogin();

            //En caso que sea isEdit nvegamos a la pagina agregar o midificar
         //   const {  isEdit } = useSelector( (state: store ) => state.applyVaccineStore);

            {/** Estas variables applyVaccineStore del store */}
         

            
            const navigation = useNavigation();

            const dispatch = useDispatch();

            const addFamily = async ()=> {
              handlerClearDependent();
                   
                  
            }

            const applyVaccinePerson = ( id: string)=>{
              // Clocamos el id del dependiente en el store de apply vaccine y la bandera ee ediotar en trrue
                 dependentById(id);
                 navigation.navigate( 'ApplyVaccinesAddScreen' as never)
            }

            {/** LLenar data */}
          // const loadData = async(limiteDesde: DesdeLimite, nextPrev: NextPrevioPage) => {
          //   await dispatch(loadDataThunks( limiteDesde, currentPage, nextPrev, token ));
         
          // }

      /* This `useEffect` hook is triggered whenever the `dependentById` value changes. It checks if the `isEdit` flag is true, and if so, it calls the `editFalseDependent` function and navigates to the 'ApplyVaccinesAddScreen' screen using the `navigation.navigate` function. This is used to handle the scenario where the user wants to edit a dependent's vaccine application. */
          // useEffect(() => {
          //    if (isEdit){
                 
          //         editFalseDependent();
          //         navigation.navigate( 'ApplyVaccinesAddScreen' as never)
          //    }
          // }, [dependentById])  

          const handlePreviousPage = () => {
            let limiteDesde ={
                limite,
                desde:desde-limite>=0?desde-limite:limite-desde
            }
            let prev: NextPrevioPage ={
              nextPage:'prev'
            }
            loadData(limiteDesde, currentPage,  prev, token, term)
          };
          const handleNextPage  = () => {
            let limiteDesde ={
                limite,
                desde:desde+limite
            }

            let next: NextPrevioPage ={
              nextPage:'next'
            }
            loadData(limiteDesde, currentPage,  next, token, term)
          };

          
         
          

                useEffect(() => {
                        setTerm(term);
                        if (term.length === 0 ) {
                            setTerm('');
                        }
                        
                        let limiteDesde ={
                          limite,
                          desde
                        }
                        let none: NextPrevioPage ={
                          nextPage:'none'
                        }
                        loadData(limiteDesde, currentPage, none, token, term)
                      }, [term])  
                
                useEffect(() => {
        
                    initPerfiles(limite, token);
                     handlerClearDependent();

                      let limiteDesde ={
                          limite,
                          desde
                      }
                      let none: NextPrevioPage ={
                        nextPage:'none'
                      }
                      loadData(limiteDesde, currentPage, none, token, term)
        
                }, [])
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
                    onDebounce={(value) => setTerm(value)}
                    style={{
                      position: 'absolute',
                      zIndex: 999,
                      width: screenWidth - 40,
                      top: (Platform.OS === 'ios') ? top : top + 30
                    }}   ></SearchInputComponent>
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
                            ListHeaderComponent={  <HeaderTitleFigma title={`Aplicar Vacuna`}
                            marginTop={(Platform.OS === 'ios') ? 120: 120}
                            stylesFigma={stylesFigma}
                            type='big'
                            
                            marginBottom={20}
                            textAlign='center'
                            ></HeaderTitleFigma> }
                            
                            renderItem={({ item }) => (
                              <View style={{marginBottom:10,
                                            marginTop:5}}>
                                <ApplyVaccinesComponent obj={item}
                                                       applyVaccinePerson = {  (id:string) => applyVaccinePerson(id)} />
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
