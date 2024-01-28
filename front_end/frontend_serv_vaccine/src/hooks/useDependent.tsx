import React, { useEffect, useState } from 'react'
import { useForm } from './useForm';
import { Dependent, DependentsResume, DesdeLimite, NextPrevioPage } from '../interfaces';
import { dependentByIdThunks, dependentDeleteThunks, dependentThunksAddModify, editFalseDependentThunks, loadDataThunks } from '../store/slices/dependent/dependentThunks.js';
import { useDispatch, useSelector } from 'react-redux';



export const useDependent = () => {

  const [dataFiltred, setDataFiltred] = useState<DependentsResume[]>([]);

    {/** Estas variables vienen del store */}
    let {  name:nameStore,  lastname:lastnameStore, phone:phoneStore, email:emailStore,  birth:birthStore, gender_id:gender_idStore,
       status:statusStore,age:ageStore, isChildren:isChildrenStore , state:stateStore, city:cityStore, edo:edoStore,
       dependentsResume } = useSelector( (state: store ) => state.dependentStore);

       {/** Estas variables son para inicializar el formulario */}
    let inic = {
      name:nameStore,
      lastname:lastnameStore,
      phone:phoneStore,
      email:emailStore,
      birth:birthStore,
      gender_id:gender_idStore,
      status:statusStore,
      state:stateStore,
      edo:edoStore,
      city:cityStore,
      age:ageStore, 
      isChildren:isChildrenStore
    }
    const {  name,  lastname, phone, email,  birth, gender_id, status
      ,age, isChildren , state, city, edo, onChange } = useForm({...inic});
     


    const [selectedGeneroId, setSelectedGeneroId] = React.useState("");
    const [selecteRelationShipId, setSelectedRelationShipId] = React.useState("");
    const [selectedUserId, setSelectedUserId] = React.useState("");
    const dispatch = useDispatch();

    {/**   datos de la tabla  */}
  const [isVisible, setIsVisible] = useState(false);
  
  const loadDataFromStore = (data:DependentsResume[]) => {
    setDataFiltred(data);
  }

  const loadData = async(limiteDesde: DesdeLimite,currentPage:number, nextPrev:NextPrevioPage, token:string, term: string) => {
    await dispatch(loadDataThunks( limiteDesde, currentPage, nextPrev, token, term));
  }
  const dependentDelete = async( id:String, token: String, dependentsResume: DependentsResume[] ) => {
      dispatch(dependentDeleteThunks(id, token, dependentsResume ))
  }
  const dependentAddModify = async(dependent: Dependent, token: string, dependentsResume:DependentsResume, total:number) => {
    await dispatch(dependentThunksAddModify(dependent, token, dependentsResume, total));
  }

  const dependentById = async(id: string, token: string) => {
    await dispatch(dependentByIdThunks(id, token));
  }
  //   
  const deleteRow = async(id:string, token:stringx) => {
    await dispatch(dependentDeleteThunks( id, token ));
    
  };

  const updateRow = async(id:string, token:string, showModal:(value:boolean)=>void) => {
    await dispatch(dependentByIdThunks( id, token ));
    showModal(true);
  };

   const editFalseDependent = () => {
      dispatch(editFalseDependentThunks( ));
  }
   
  const updateRowFigma =  async(id:string, token:string) => {
    
      dispatch(await dependentByIdThunks( id, token ));
   
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


    const initPerfiles = async (limite:number, token: string) => {

      let limiteDesde ={
        limite,
        desde:0
      }
      let prev: NextPrevioPage ={
        nextPage:'none'
      }
    //  loadData(limiteDesde, prev);
      let currentPage = 0;
      await dispatch(loadDataThunks( limiteDesde, currentPage, prev, token ));
    } 
    

    useEffect(() => {
      loadDataFromStore(dependentsResume);
    }, [dependentsResume])
    

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
         state,
         city,
         age,
         isChildren,
         edo,
         onChange,
         selectedGeneroId,
         selecteRelationShipId,
         selectedUserId,
         updateRow,
         updateRowFigma,
         dependentAddModify,
         editFalseDependent,
         dependentById,
         dataFiltred, 
         deleteRow,
         dependentDelete,
         setIsVisible,
         isVisible,
         initPerfiles,
         loadData
  }
}
