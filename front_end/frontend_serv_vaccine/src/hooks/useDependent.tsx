import React, { useState } from 'react'
import { useForm } from './useForm';
import { Dependent } from '../interfaces';
import { dependentByIdThunks, dependentAddThunks, dependentDeleteThunks, loadDataThunks } from '../store/slices/dependent/dependentThunks.js';
import { useDispatch } from 'react-redux';
import perfiles from '../interfaces/perfil-figma-interfaces';



export const useDependent = ({...iniForm}:Dependent) => {
    const { name,  lastname, state, city,  phone, email,  birth, gender_id, status , onChange } = useForm({...iniForm});
    const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
    const [selecteRelationShipId, setSelectedRelationShipId] = React.useState("");
    const [selectedUserId, setSelectedUserId] = React.useState("");
    const dispatch = useDispatch();

    {/**   datos de la tabla  */}
  const [isVisible, setIsVisible] = useState(false);
  const [tableData, setTableData] = useState([
    {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      gender_id: '',
      birth: '',
      user_id: '',
      relationship_id: '',
      status: true,
    },
  ]);

  const addRow =async(token: string, showModal:(value:boolean)=>void) => {
    await dispatch(dependentAddThunks( token ));

    // Actualizamos la data de la tabla
    let limiteDesde ={
      limite:1000,
      desde:0
    }
    let nextPrev: NextPrevioPage ={
      nextPage:'none'
    }
    let currentPage = 0;
    await dispatch(loadDataThunks( limiteDesde, currentPage, nextPrev, token ));

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
         state,
         city,
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
