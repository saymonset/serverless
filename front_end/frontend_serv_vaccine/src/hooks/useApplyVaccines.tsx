import React, { useEffect, useState } from 'react'
import { useForm } from './useForm';
import { Dependent, DependentsResume, DesdeLimite, NextPrevioPage } from '../interfaces';
import { dependentByIdThunks, editFalseApplyVaccineThunks} from '../store/slices/applyvaccines/applyVaccinesThunks.js';
import { useDispatch, useSelector } from 'react-redux';



export const useApplyVaccines = () => {

  const [dataFiltred, setDataFiltred] = useState<DependentsResume[]>([]);

    {/** Estas variables vienen del store */}
    let { _id:_idStore, lote:loteStore,  image:imageStore, dosis_id:dosis_idStore,  vaccination_date:vaccination_dateStore,
       status:statusStore } = useSelector( (state: store ) => state.dependentStore);

       {/** Estas variables son para inicializar el formulario */}
    let inic = {
      _id:_idStore,
      lote:loteStore,
      image:imageStore,
      dosis_id:dosis_idStore,
      vaccination_date:vaccination_dateStore,
      status:statusStore,
    }
    // console.log('----------saymons---------')
    // console.log({dependent_idStore})
    // console.log('----------saymons--------II-')
    // console.log({inic})
    const { _id, lote,  image, dosis_id,  vaccination_date, status, onChange } = useForm({...inic});
     


    // const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
    // const [selecteRelationShipId, setSelectedRelationShipId] = React.useState("");
    // const [selectedUserId, setSelectedUserId] = React.useState("");
    const dispatch = useDispatch();

  //   {/**   datos de la tabla  */}
  // const [isVisible, setIsVisible] = useState(false);
  
  // const loadDataFromStore = (data:DependentsResume[]) => {
  //   setDataFiltred(data);
  // }

  // const loadData = async(limiteDesde: DesdeLimite,currentPage:number, nextPrev:NextPrevioPage, token:string, term: string) => {
  //   await dispatch(loadDataThunks( limiteDesde, currentPage, nextPrev, token, term));
  // }
  // const dependentDelete = async( id:String, token: String, dependentsResume: DependentsResume[] ) => {
  //     dispatch(dependentDeleteThunks(id, token, dependentsResume ))
  // }
  // const dependentAddModify = async(dependent: Dependent, token: string, dependentsResume:DependentsResume, total:number) => {
  //   await dispatch(dependentThunksAddModify(dependent, token, dependentsResume, total));
  // }

  const dependentById = async(id: string) => {
    await dispatch(dependentByIdThunks(id));
  }

  const editFalseDependent = () => {
      dispatch(editFalseApplyVaccineThunks( ));
  }
  //   
  // const deleteRow = async(id:string, token:stringx) => {
  //   await dispatch(dependentDeleteThunks( id, token ));
    
  // };

  // const updateRow = async(id:string, token:string, showModal:(value:boolean)=>void) => {
  //   await dispatch(dependentByIdThunks( id, token ));
  //   showModal(true);
  // };


   
  // const updateRowFigma =  async(id:string, token:string) => {
    
  //     dispatch(await dependentByIdThunks( id, token ));
   
  // };
   

    // let onGeneroSelectTrigger = (value:string) => {
    //     setSelectedGeneroId(value);
    // }


    // const onUserSelectTrigger = (value:string) => {
    //     setSelectedUserId(value);
    // }



    // const onRelationShipSelectTrigger = (value:string) => {
    //     setSelectedRelationShipId(value);
    // }


    // const initPerfiles = async (limite:number, token: string) => {

    //   let limiteDesde ={
    //     limite,
    //     desde:0
    //   }
    //   let prev: NextPrevioPage ={
    //     nextPage:'none'
    //   }
    // //  loadData(limiteDesde, prev);
    //   let currentPage = 0;
    //   await dispatch(loadDataThunks( limiteDesde, currentPage, prev, token ));
    // } 
    

 

    // const onDependent = async(dependent_id: string ) => {

    // }

  return {
        //  onGeneroSelectTrigger,
        //  onUserSelectTrigger,
        //  onRelationShipSelectTrigger,
        //  onDependent,
         _id,
         lote, 
         image, 
         dosis_id, 
         vaccination_date,
         onChange,
         dependentById,
         editFalseDependent,
        //  selectedGeneroId,
        //  selecteRelationShipId,
        //  selectedUserId,
        //  dependentById,
        //  dataFiltred, 
        //  setIsVisible,
        //  isVisible,
         
  }
}
