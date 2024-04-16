import { useNavigation } from '@react-navigation/native';
import React, {  useEffect, useState } from 'react'
import { Button, Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { ApplyVaccinesComponent } from '../components/ApplyVaccinesComponent';
import {  NextPrevioPage } from '../interfaces';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from './LoadingScreen';
import { useDependent } from '../hooks/useDependent';
import { SearchInputComponent } from '../components/SearchInputComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { useLogin } from '../hooks/useLogin';
import { BackePageComponente } from '../components/BackePageComponente';



const screenWidth = Dimensions.get("window").width;

export const  ConsultVaccinesDependentsScreen =  () => {

            let { dependentById, isConsultVaccine } = useApplyVaccines();
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

            
            const navigation = useNavigation();


            const applyVaccinePerson = ( id: string)=>{
              // Clocamos el id del dependiente en el store de apply vaccine y la bandera ee ediotar en trrue
                 dependentById(id);
                 navigation.navigate( 'ApplyVaccineConsultaScreen' as never)
            }

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
                 
    {/**  Boton regreso */}
    <BackePageComponente  page="HomeFigmaTabRootScreen" />

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

                       
                       
                         
                  </View> 
                 {  ( isLoading ) ? <LoadingScreen /> : 
                
                                <>
                                    <SearchInputComponent
                                        onDebounce={(value) => setTerm(value)}
                                        style={{
                                          position: 'absolute',
                                          zIndex: 999,
                                          width: screenWidth - 40,
                                          top: (Platform.OS === 'ios') ? top  : top + 40
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
                                                ListHeaderComponent={  <HeaderTitleFigma 
                                                title={isConsultVaccine ? 'Consultar Vacuna' : 'Familiares'}
                                                marginTop={(Platform.OS === 'ios') ? 140: 140}
                                                stylesFigma={stylesFigma}
                                                type='big'
                                                
                                                marginBottom={20}
                                                textAlign='center'
                                                ></HeaderTitleFigma> }
                                                
                                                renderItem={({ item }) => (
                                                  <View style={{marginBottom:10,
                                                                marginTop:15}}>
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
                                </>
                }
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
