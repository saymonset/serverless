import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGendersAction } from '../../actions/genderAction';
import { GenderElement } from '../../infrastructure/interfaces/gender';
import { selectOption } from '../../infrastructure/interfaces/select-option';
import { RootState } from '../store';
import { genderLoadStore, startGenderStore, stopGenderStore } from '../store/slices/gender';
 

export const useGender = () => {
    const {  genders, isLoading } = useSelector((state: RootState) => state.genderStore);
    const dispatch = useDispatch();



  const loadGender = async ()  => {
      try {
        //  dispatch( removeError())
          dispatch( startGenderStore())
          // TODO: realizar peticion http
          const  genders:GenderElement[] =  await getGendersAction();

          //Transformamos
          let selections: selectOption[] =( genders.map((gender) => ({
            key: gender._id.$oid,
            value: gender.name,
            disabled: false
          })));

          //enviamos al payload
          const payload =  {
            genders: selections
          }
          dispatch( genderLoadStore(payload) );
          dispatch( stopGenderStore() );
      } catch (error) {
           console.log(error)
      }
    }

    return {
      loadGender,
       isLoading,
       genders,
       
  }
}
