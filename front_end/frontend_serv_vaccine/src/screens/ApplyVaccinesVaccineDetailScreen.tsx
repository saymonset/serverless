import React from 'react'
import {   Dimensions, FlatList, Platform, StyleSheet , View } from 'react-native'
import { HeaderTitleFigma } from '../components/HeaderTitleFigmaComponent';
import { stylesFigma } from '../theme/appFigmaTheme';
import { LoadingScreen } from './LoadingScreen';
import { useApplyVaccines } from '../hooks/useApplyVaccines';
import { ApplyVaccineByDependentListComponent } from '../components/ApplyVaccineByDependentListComponent';
import { useLogin } from '../hooks/useLogin';




export const ApplyVaccinesVaccineDetailScreen =  () => {
  const { token } = useLogin();
  let {   dependent , 
          isLoading,
          vaccineuniqueFromTableData, 
          onLoadbyDosis,
          handleByIdApplyVaccine} = useApplyVaccines();
           
          let keyCounter = 0;

          const goPage = (value: any) => {
            
           
        
           // console.log(value);
            const {  dosis, dependent } = value;
            const { _id:{$oid:dosisId} } = dosis;
            const { _id:{$oid:dependentId} } = dependent;
            //console.log({dosisId, dependentId});
            handleByIdApplyVaccine(dosisId, dependentId, token);
            onLoadbyDosis();
          };  

          
           
  return (
    <>
                 {  ( isLoading ) ? <LoadingScreen />  :
                          <>
                             <FlatList
                                data={vaccineuniqueFromTableData}
                                keyExtractor={() => {
                                  keyCounter++;
                                  return keyCounter.toString();
                                }}
                                showsHorizontalScrollIndicator={true}
                                numColumns={1}
                                horizontal={false}
                                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: 'lightgray'}} />}
                                ListHeaderComponent={  <HeaderTitleFigma title={`Listar vacunas aplicadas por ${dependent.name} ${dependent.lastname}`}
                                marginTop={(Platform.OS === 'ios') ? 0: 0}
                                stylesFigma={stylesFigma}
                                type='big'
                                
                                marginBottom={20}
                                textAlign='center'
                                ></HeaderTitleFigma> }
                                
                                renderItem={({ item }) => (
                                  <View style={{marginBottom:10,
                                                marginRight:39,
                                                marginTop:5}}>
                                    <ApplyVaccineByDependentListComponent applyVaccine={item}
                                                      goPage  = { ( value )  => goPage( value )}  />
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
 

