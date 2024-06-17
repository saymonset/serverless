import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDependentByPageAction } from '../../actions/dependents/get-dependents-by-pageAction.ts';
import { deleteDependentAction, updateCreateDependentAction } from '../../actions/dependents/update-create-dependents';
import { getGendersAction } from '../../actions/genderAction';
import { Dependent } from '../../infrastructure/interfaces/dependent-interface';
import { DependentById } from '../../infrastructure/interfaces/dependentById-interface';
import { GenderElement } from '../../infrastructure/interfaces/gender';
import { selectOption } from '../../infrastructure/interfaces/select-option';
import { RootState } from '../store';
import { clearDependentIdDeleted, putDependentIdDeleted, startLoadingStore, stopLoadingStore } from '../store/slices/dependent';
import { useLogin } from './useLogin';
 

export const useDependent = () => {
   
    const {  isLoading, dependentIdDeleted } = useSelector((state: RootState) => state.dependentByIdStore);
    const dispatch = useDispatch();

    const  updateCreateDependent = async (dependent: Partial<DependentById>) =>{
      return  updateCreateDependentAction({...dependent})
    }

    // 
    const getDependentslist = async (pageParam: number):Promise<Dependent[]> =>{
      try{
        const { user } = useLogin();
        dispatch( startLoadingStore())
        // TODO: realizar peticion http
        let term = "''";
        const dependents:Dependent[] = await getDependentByPageAction(10000,pageParam, term, user!);
        //const dependents = await getDependentByPageAction(10000,params.pageParam, termUpdate(), user!);
        //dispatch( genderLoadStore(payload) );
        dispatch( stopLoadingStore() );
        return dependents ?? [];

      }catch(error){
        console.log({error});
        return [];
      }
    }

    const dependentAddModify = async (onMutate:(values:DependentById)=>void)  => {
        try {
          //  dispatch( removeError())
            dispatch( startLoadingStore())
            // TODO: realizar peticion http
          //  const  daty =  await updateCreateDependentAction();

            
            //dispatch( genderLoadStore(payload) );
            dispatch( stopLoadingStore() );
        } catch (error) {
            console.log(error)
        }
      }
   
      const startLoading =  ()  => {
        try {
            dispatch( startLoadingStore())
        } catch (error) {
            console.log(error)
        }
      }
      const stopLoading =  ()  => {
        try {
            dispatch( stopLoadingStore() );
        } catch (error) {
            console.log(error)
        }
      }

      const dependentDelete = async ( dependentIdDeleted:String)=> {
          try {
                dispatch( startLoadingStore());
                const data = await deleteDependentAction(dependentIdDeleted);
               
                dispatch( stopLoadingStore());
          } catch (error) {
               console.log('Eliminando');
               console.log({error});
          }
      }  
      const putDependIdDelete = async (dependentIdDeleted:String)=> {
          try {
              let payload = {
                dependentIdDeleted
            }
            dispatch( putDependentIdDeleted({payload}));
          } catch (error) {
               console.log('Eliminando');
               console.log({error});
          }
      }  
      const clearDependIdDelete = async ()=> {
          try {
                dispatch( clearDependentIdDeleted());
          } catch (error) {
               console.log('Eliminando');
               console.log({error});
          }
      }  

    return {
      updateCreateDependent,
      dependentAddModify,
      dependentDelete,
      putDependIdDelete,
      getDependentslist,
      clearDependIdDelete,
      isLoading,
      dependentIdDeleted,
      startLoading,
      stopLoading
        
       
  }
}
