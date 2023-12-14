import React, { useState } from 'react'
import { Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {   store } from '../store' 
import {  registerThunks } from '../store/slices/register' 

import { useForm } from './useForm';
import { Dependent } from '../interfaces';
import { dependentByIdThunks, dependentAddThunks, dependentDeleteThunks } from '../store/slices/dependent/dependentThunks.js';
import { useDispatch, useSelector } from 'react-redux';


export const useDependent = ({...iniForm}:Dependent) => {
 
 
    //
    const { name,  lastname,  phone, email,  birth, gender_id, status , onChange } = useForm({...iniForm});



    const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
    const [selecteRelationShipId, setSelectedRelationShipId] = React.useState("");
    const [selectedUserId, setSelectedUserId] = React.useState("");

    const dispatch = useDispatch();

    {/**   datos de la tabla  */}


  const [isVisible, setIsVisible] = useState(false);

  const [tableData, setTableData] = useState([
    {
      name: 'Samy',
      lastname: 'true',
      email: 'oracle@gmail.com',
      phone: '04142711347',
      gender_id: '65391c195f461c1c76e06647',
      birth: '2016-03-03T08:00:00.000',
      user_id: '653bb43c4c9a1e92b73983b9',
      relationship_id: '653bc2727a410e288cb781da',
      status: true,
    },
  ]);

  const addRow =async(token: string, showModal:(value:boolean)=>void) => {
    await dispatch(dependentAddThunks( token ));
    showModal(true);
  };

  const deleteRow = async(id:string, token:stringx) => {
    await dispatch(dependentDeleteThunks( id, token ));
    // const newData = [...tableData];
    // newData.splice(index, 1);
    // setTableData(newData);
  };

  const updateRow = async(id:string, token:string, showModal:(value:boolean)=>void) => {
    await dispatch(dependentByIdThunks( id, token ));
    showModal(true);
  };

   

   

    let onGeneroSelectTrigger = (value:string) => {
        setSelectedGeneroId(value);
    }


    const onUserSelectTrigger = (value:string) => {
        setSelectedUserId(value);
    }



    const onRelationShipSelectTrigger = (value:string) => {
        setSelectedRelationShipId(value);
    }


    const onDependent = async() => {

    }

  return {
         onGeneroSelectTrigger,
         onUserSelectTrigger,
         onRelationShipSelectTrigger,
         onDependent,
         name,  
         lastname,  
         phone,      
         email, 
         birth, 
         gender_id, 
         status, 
         onChange,
         selectedGeneroId,
         selecteRelationShipId,
         selectedUserId,
         tableData,
         updateRow,
         addRow,
         deleteRow,
         setIsVisible,
         isVisible
  }
}
