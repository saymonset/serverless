import React, { useState} from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPrevioPage } from '../interfaces';
import perfiles, { PerfilFigma } from '../interfaces/perfil-figma-interfaces';
import { loadDataThunks } from '../store/slices/dependent';


export const usePerfilFigma = () => {
    const [ setIsLoading] = useState(true);
    const [ lista, setLista] = useState< PerfilFigma[] >( perfiles );
    const {  usuario:{ token }  } = useSelector((state: store) => state.loginStore);

    const { message, resp, tableData, total, limite, desde, currentPage, isLoading, isDelete } = useSelector( (state: store ) => state.dependentStore);

    const dispatch = useDispatch();

    const   loadDataFromStore = async () => {
      let limiteDesde ={
       limite,
       desde:0
     }
     let prev: NextPrevioPage ={
       nextPage:'none'
     }
     loadData(limiteDesde, prev)
 }
    const loadInfo = async () => {
     
        loadDataFromStore();
       
       //  const data = perfiles;
         //setLista(data);
        
    }

    useEffect( () => {
        loadInfo();
    }, []);

     {/** LLenar data */}
const loadData = async(limiteDesde: DesdeLimite, nextPrev: NextPrevioPage) => {
  await dispatch(loadDataThunks( limiteDesde, currentPage, nextPrev, token ));
  console.log('-------1---------------');
  console.log({tableData});
  console.log('-------2---------------');

  // Define the desired format
const PerfilFigma = tableData.map(item => ({
                icon: "person-outline",
                name: item.name,
                lastname: item.lastname,
                isUser: item.isUser
              }));
              setLista(PerfilFigma);  
                
}

  return  {
         lista,
         isLoading
  }
}
