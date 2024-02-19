import React from 'react'
import {   Dimensions, FlatList, Platform, StyleSheet , View } from 'react-native'
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from './LoadingScreen';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { ApplyVaccineByDependentListComponent } from '../components/ApplyVaccineByDependentListComponent';
import { ApplyVaccineDosisByDependent } from '../components/ApplyVaccineDosisByDependent';




export const ApplyVaccinesDetailScreen =  () => {

  let {  dependent , isLoading,
    dosis, onLoadbyDosisOff} = useApplyVaccines();
            let keyCounter = 0;
            const goPage = (value: any) => {
              onLoadbyDosisOff();
          };  

          
           console.log('-----------------q--------------');
           console.log({dosis})
  return (
    <>
                 {  ( isLoading ) ? <LoadingScreen />  :
                          <>
                                    <FlatList
                                            data={dosis}
                                            keyExtractor={() => {
                                              keyCounter++;
                                              return keyCounter.toString();
                                            }}
                                            showsHorizontalScrollIndicator={false}
                                            numColumns={1}
                                            horizontal={false}
                                            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgray'}} />}
                                            style={{marginTop:10}}
                                            renderItem={({ item }) => (
                                              <View style={{marginBottom:10,
                                                            marginTop:5}}>
                                                <ApplyVaccineDosisByDependent dosis={item}
                                                                  goPage  = { ( value )  => goPage( value )}                     />
                                              </View>
                                            )}
                                          />
                             </>
                         } 
    </>
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
