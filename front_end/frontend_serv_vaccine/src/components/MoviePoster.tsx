import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { loginStyles } from '../theme/loginTheme'
import { Background } from './Background'
import { increment } from '../store/slices/counter'
import { getPokemons } from '../store/slices/pokemon'
import { useEffect } from 'react';
import { LoadingScreen } from '../screens/LoadingScreen';

export const MoviePoster = () => {

    const { counter } = useSelector( state => state.counter)
    const { isLoading, pokemons = [], page } = useSelector( state => state.pokemons)
    const dispatch = useDispatch();

    const { top } = useSafeAreaInsets;


    // useEffect(() => {
    //    dispatch(getPokemons(0))
    // }, []);

    const fetchPokemons = async (pagina) => {
    //  console.log({pagina})
      console.log({pagina})
      await dispatch(getPokemons(pagina));
    };

    useEffect(() => {
      fetchPokemons();
    }, []);

    const onLogin = () => {
      dispatch(increment());
      fetchPokemons(page );
  }

  const renderPokemon = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.img}</Text>
      <Text>{item.link}</Text>
      <Text>{item.status}</Text>
    </View>
  );

  if ( isLoading ) return <LoadingScreen /> 
  return (
    <>
           {/* Background */}
           {/* <Background /> */}

         
           <View style={styles.container}>
              <Text style={styles.heading}>ADS</Text>
              <View style={styles.separator} />
              <FlatList
                data={pokemons}
                renderItem={renderPokemon}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={ loginStyles.buttonContainer }>
                    <TouchableOpacity
                        activeOpacity={ 0.8 }
                        style={ loginStyles.button }
                        onPress={ ()=>{
                          onLogin();
                        }
                      }
                    >
                    <Text style={ loginStyles.buttonText } >Incrementargg</Text>
                </TouchableOpacity>
          </View>
            </View>

        <View style={{marginTop: top}}><Text>MoviePosteZZZZr { counter }, { JSON.stringify(isLoading) }</Text>
              

        </View>
      </>

  )
}
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
