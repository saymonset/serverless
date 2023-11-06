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
import { useGetTodoByIdQuery, useGetTodosQuery } from '../store/apis';

export const TodoApp = () => {

    const { counter } = useSelector( state => state.counter)
    const { pokemons = [], page } = useSelector( state => state.pokemons)
    const dispatch = useDispatch();

    const { top } = useSafeAreaInsets;


    
    const {data: todos = [], isLoading } = useGetTodosQuery();
    const {data: todo } = useGetTodoByIdQuery('6545275deec318a127ce48e8');


    console.log({todos})

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
          <Text style={styles.heading}>{ JSON.stringify(todo)}</Text>
              <Text style={styles.heading}>Todo apps</Text>
              <View style={styles.separator} />
              <FlatList
                data={todos?.ads}
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
