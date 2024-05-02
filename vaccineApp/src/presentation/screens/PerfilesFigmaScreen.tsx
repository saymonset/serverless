import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, FlatList, Platform, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Layout, Text } from '@ui-kitten/components';
import { stylesFigma } from './theme/appFigmaTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { LoadingScreen } from './loading/LoadingScreen';
import { SearchInputComponent } from '../components/SearchInputComponent';



const screenWidth = Dimensions.get("window").width;

export const PerfilesFigmaScreen = () => {
    const { top } = useSafeAreaInsets();
    const [ term, setTerm ] = useState('');
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const addFamily = async ()=> {
       //    dispatch(beforedependentAddThunks());
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
              //  dependentDelete(id, token, dependentsResume);
              },
            },
          ],
          { cancelable: false }
        );
    }

    useEffect(() => {
        //busqueda
      //  setTerm('');
        // initPerfiles(limite, token);
        // dispatch( clearDependenThunks());

        //   let limiteDesde ={
        //       limite,
        //       desde
        //   }
        //   let none: NextPrevioPage ={
        //     nextPage:'none'
        //   }
        //   loadData(limiteDesde, currentPage, none, token, term)

    }, [])


  return (
    <Layout style={styles.container}>
    <Layout style={[styles.card, { marginTop: 10, marginBottom: (Platform.OS==='ios') ? 40 : 0 }]}>
       <Layout style = {{ ... styles.globalMargin,
                     alignItems:'center',
                     flex:1, 
                     backgroundColor:'white'}}>
                  <Layout style={{
                                ...styles.search
                                }}>
                        <Text style={stylesFigma.hola}></Text>
                        <Layout style = {{ flex: 1 }} />
                        {/* Flecha de busqueda */}

                        {/* Agregamos usuario */}
                        <Pressable 
                              onPress={()=> addFamily()} 
                               >
                              <Icon
                                  name = "add-circle-outline"
                                  color = "black"
                                  size = { 40 }
                              />
                         </Pressable>     

                         
                  </Layout> 
                 {/* {  ( isLoading ) && <LoadingScreen /> } */}
                
                 <SearchInputComponent
                    onDebounce={(value) => setTerm(value)}
                    style={{
                      position: 'absolute',
                      zIndex: 999,
                      width: screenWidth - 40,
                      top: (Platform.OS === 'ios') ? top +30 : top + 50
                    }}   ></SearchInputComponent>
                    {/* <FlatList
                            data={dataFiltred}
                            keyExtractor={() => {
                              keyCounter++;
                              return keyCounter.toString();
                            }}
                            showsHorizontalScrollIndicator={true}
                            numColumns={1}
                            horizontal={false}
                            ItemSeparatorComponent={() => <Layout style={{ height: 1, backgroundColor: 'lightgray'}} />}
                            ListHeaderComponent={  <HeaderTitleFigma title={`Perfiles`}
                            marginTop={(Platform.OS === 'ios') ? 120: 120}
                            stylesFigma={stylesFigma}
                            type='big'
                            
                            marginBottom={20}
                            textAlign='center'
                            ></HeaderTitleFigma> }
                            
                            renderItem={({ item }) => (
                              <Layout style={{marginBottom:10,
                                            marginTop:5}}>
                                <PerfilFigmaComponent obj={item}
                                                       deleteRow = {  (id:string) => deleteRow(id)} />
                              </Layout>
                            )}
                          /> */}
                        
                   {/* Controles del paginador */}
       </Layout>
      </Layout>
    </Layout>
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
  