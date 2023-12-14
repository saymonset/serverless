import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, Alert, Keyboard, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Table, Row, Cell } from 'react-native-reanimated-table';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DependentComponent } from '../components/DependentComponent';
import { Background } from '../components/Background';
import { useDispatch, useSelector } from 'react-redux';
import {  removeErrorThunks, loadDataThunks } from '../store/slices/dependent/dependentThunks.js';
import { useDependent } from '../hooks/useDependent';
import { DesdeLimite } from '../interfaces/dependent-interfaces';

import { NextPrevioPage } from '../interfaces';
import { UseHandlerPag } from '../hooks/useHandlerPag';
import { LoadingScreen } from './LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen } from './HomeScreen';


 
export const DependentScreen = () => {

    const navigation = useNavigation();

    const iniForm =  {name:'', lastname:'', phone:'', email:'', birth: new Date(), gender_id:'', status:true}

    const {  setIsVisible, isVisible, updateRow, deleteRow, addRow   } = useDependent({...iniForm});
    const { token } = useSelector( (state: store ) => state.loginStore);
    const { message, resp, tableData, total, limite, desde, currentPage, isLoading, isDelete } = useSelector( (state: store ) => state.dependentStore);

    //const {page, whereGo } = UseHandlerPag(currentPage==0? currentPage + 1:currentPage);
    

    const dispatch = useDispatch();


    const showModal = (value:boolean) =>{
      setIsVisible(value)
    }

  const onRegister = async() => {
        Keyboard.dismiss();
     }

  const   onBack = async () => {
     Keyboard.dismiss();
     let limiteDesde ={
      limite,
      desde:0
    }
    let prev: NextPrevioPage ={
      nextPage:'none'
    }
    loadData(limiteDesde, prev)
     navigation.navigate( 'HomeScreen' as never)
}

  const   onClearError = async () => {
    await removeErrorThunks(dispatch)
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


  


  useEffect(() => {
    if( message.length === 0 ) return;

    Alert.alert( message , '',[{
        text: 'Ok',
        onPress: onClearError
    }]);

    {/** Ocultamos el modal */}
    if (resp || isDelete){
       setIsVisible(false);
          let limiteDesde ={
            limite,
            desde:0
          }
          let prev: NextPrevioPage ={
            nextPage:'none'
          }
          loadData(limiteDesde, prev)
    }
}, [ message ]);




  return (
    <>
     {/* Background */} 
     <Background></Background>

    
     <View style={{ marginHorizontal: 20, marginVertical: 60 }}>
          
          {/* {   ( isLoading ) && <LoadingScreen /> }        */}

          {tableData ? (
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                          <Row
                                            data={['Name', 'Lastname', 'Email', 'Phone', 'Actions']}
                                            style={[{ backgroundColor: '#585858'}]}
                                            textStyle={{ margin: 6, color: 'white' }}
                                          />
                                          {tableData && tableData.map((rowData, index) => (
                                            <Row
                                              key={index}
                                              data={[
                                                rowData.name ,
                                                rowData.lastname,
                                                rowData.email,
                                                rowData.phone,
                                                <View style={{ flexDirection: 'row' }}>
                                                  <TouchableOpacity onPress={
                                                              () => {
                                                                updateRow(rowData._id.$oid, token, showModal);
                                                              
                                                              }
                                                    }  style={{ marginRight: 10 }}>
                                                    <Ionicons name="pencil" size={20} color="black" />
                                                  </TouchableOpacity>
                                                  <TouchableOpacity onPress={
                                                                    () => {
                                                                      deleteRow(rowData._id.$oid, token)
                                                                    }
                                                                    }>
                                                            {rowData.isUser ? <></>:<Ionicons name="trash" size={20} color="red" />} 
                                                  </TouchableOpacity>
                                                </View>,
                                              ]}
                                              style={[{ backgroundColor: rowData.isUser ? 'white' : 'white' }]}
                                              textStyle={{ margin: 6 ,  color: rowData.isUser ? 'gray' : '#000000' }}
                                            />
                                ))}
              </Table>
              ) : (
                <View>
                  <LoadingScreen />
                </View>
              )}   
          {/* Controles del paginador */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop:20 }}>
        <Button title="Anterior" onPress={handlePreviousPage} disabled={currentPage === 1 || isLoading} />
        <Text style={{ marginHorizontal: 10, color:'white' }}>Página {currentPage} / { Math.ceil(total / limite ) }</Text>
        <Button title="Siguiente" onPress={handleNextPage} disabled={currentPage === Math.ceil(total / limite ) ||isLoading} />
      </View>

      {/* totalPages */}

      <TouchableOpacity onPress={() => {
                                                                addRow(token, showModal);
                                                              }
                                                    }  style={{ marginRight: 10 }}>
            <Ionicons name="add" size={20} color="white" />
          </TouchableOpacity>

          <Modal animationType="fade" visible={isVisible} transparent={true}>
                <DependentComponent isVisible={isVisible} onClose={() => setIsVisible(false)} 
                onRegister = { ()=>onRegister()} 
                width={300} height={690} />
          </Modal>
        </View>
   
        
      <View style={{ flexDirection: 'row',justifyContent:'center', marginBottom:0, marginHorizontal:1, top:( Platform.OS === 'ios') ? 230: 570 }}>
          <TouchableOpacity onPress={() => { onBack() }} style={{ marginTop: 0 }}>
              <Ionicons name="arrow-back-circle-outline" size={40} color="black" />
          </TouchableOpacity>
      </View>
      


    </>
  );
};
