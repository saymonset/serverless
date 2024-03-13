import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Dimensions, FlatList, Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { PerfilFigmaComponent } from '../components/PerfilFigmaComponent';
import { DependentsResume, NextPrevioPage } from '../interfaces';
import { beforedependentAddThunks, loadDataThunks, dependentDeleteThunks, clearDependenThunks } from '../store/slices/dependent';
import { comunStylesFigma } from '../theme/comunFigmaTheme';
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from './LoadingScreen';
import { AuthContext } from '../context/AuthContext';
import { useDependent } from '../hooks/useDependent';
import { SearchInputComponent } from '../components/SearchInputComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';



const screenWidth = Dimensions.get("window").width;

export const PerfilesFigmaScreen =  () => {

           

            const { top } = useSafeAreaInsets();
            const [ term, setTerm ] = useState('');
            
           
            let keyCounter = 0;

          
            const { initPerfiles, 
                    dataFiltred, 
                    loadData,
                    dependentDelete } = useDependent();
            const {  usuario:{ token }  } = useSelector((state: store) => state.loginStore);
            const {  total, limite, desde, currentPage, isLoading, dependentsResume } = useSelector( (state: store ) => state.dependentStore);
            
            const navigation = useNavigation();

            const dispatch = useDispatch();

            const addFamily = async ()=> {
                    dispatch(beforedependentAddThunks());
                    navigation.navigate( 'PerfilFigmaAddScreen' as never)
                  
            }

            const deleteRow = ( id: string)=>{
                
                  Alert.alert(
                    'Confirmar eliminación',
                    '¿Estás seguro que deseas eliminar este elemento?',
                    [
                      {
                        text: 'Cancelar',
                        style: 'cancel',
                      },
                      {
                        text: 'Eliminar',
                        style: 'destructive',
                        onPress: () => {
                          // Lógica para eliminar el elemento
                          dependentDelete(id, token, dependentsResume);
                        },
                      },
                    ],
                    { cancelable: false }
                  );
            }

            {/** LLenar data */}
          // const loadData = async(limiteDesde: DesdeLimite, nextPrev: NextPrevioPage) => {
          //   await dispatch(loadDataThunks( limiteDesde, currentPage, nextPrev, token ));
         
          // }


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
                        //  setDataFiltred(
                        //   dependentsResume.filter(
                        //       ( item:DependentsResume ) => item.name.toLowerCase().includes( term.toLowerCase() ))
                        //  );
                      }, [term])  
                
                useEffect(() => {
                    //busqueda
                  //  setTerm('');

                  
                    initPerfiles(limite, token);
                    dispatch( clearDependenThunks());

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
                      top: (Platform.OS === 'ios') ? top +30 : top + 50
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
                            ListHeaderComponent={  <HeaderTitleFigma title={`Perfiles`}
                            marginTop={(Platform.OS === 'ios') ? 120: 120}
                            stylesFigma={stylesFigma}
                            type='big'
                            
                            marginBottom={20}
                            textAlign='center'
                            ></HeaderTitleFigma> }
                            
                            renderItem={({ item }) => (
                              <View style={{marginBottom:10,
                                            marginTop:5}}>
                                <PerfilFigmaComponent obj={item}
                                                       deleteRow = {  (id:string) => deleteRow(id)} />
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
