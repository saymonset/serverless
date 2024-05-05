import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateCreateDependentAction } from '../../actions/dependents/update-create-dependents';
import { getGendersAction } from '../../actions/genderAction';
import { DependentById } from '../../infrastructure/interfaces/dependentById-interface';
import { GenderElement } from '../../infrastructure/interfaces/gender';
import { selectOption } from '../../infrastructure/interfaces/select-option';
import { RootState } from '../store';
import { startLoadingStore, stopLoadingStore } from '../store/slices/dependent';
 

export const useDependent = () => {
    const {  isLoading } = useSelector((state: RootState) => state.dependentByIdStore);
    const dispatch = useDispatch();



   const  updateCreateDependent = async (dependent: Partial<DependentById>) =>{
          
    return  updateCreateDependentAction({...dependent})
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

    return {
      updateCreateDependent,
      dependentAddModify,
       isLoading,
        
       
  }
}
