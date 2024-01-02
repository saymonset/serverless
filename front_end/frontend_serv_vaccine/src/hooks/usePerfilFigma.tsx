import React, { useState} from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPrevioPage } from '../interfaces';
import perfiles, { PerfilFigma } from '../interfaces/perfil-figma-interfaces';
import { loadDataThunks } from '../store/slices/dependent';


export const usePerfilFigma = () => {
    const [ lista, setLista] = useState< PerfilFigma[] >( perfiles );
    const {  usuario:{ token }  } = useSelector((state: store) => state.loginStore);

    const { message, resp, tableData, total, limite, desde, currentPage, isLoading, isDelete } = useSelector( (state: store ) => state.dependentStore);

    const dispatch = useDispatch();

      {/** LLenar data */}
    const   loadDataFromStore = async () => {
      let limiteDesde ={
       limite,
       desde:0
     }
     let nextPrev: NextPrevioPage ={
       nextPage:'none'
     }
     await dispatch(loadDataThunks( limiteDesde, currentPage, nextPrev, token ));
     // Define the desired format
     setLista( tableData.map(item => ({
                   icon: "person-outline",
                   name: item.name,
                   lastname: item.lastname,
                   isUser: item.isUser
                 })));
 }
    useEffect( () => {
      loadDataFromStore();
    }, []);

   
 

  return  {
         lista,
         isLoading
  }
}
