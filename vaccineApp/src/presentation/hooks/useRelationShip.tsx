import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getGendersAction } from '../../actions/genderAction';
import { relationShipAction } from '../../actions/relationShipAction';
import { GenderElement } from '../../infrastructure/interfaces/gender';
import { Relationship } from '../../infrastructure/interfaces/relationship';
import { selectOption } from '../../infrastructure/interfaces/select-option';
import { RootState } from '../store';
import { genderLoadStore, startGenderStore, stopGenderStore } from '../store/slices/gender';
import { relationShipLoadStore, startRelationShipStore, stopRelationShipStore } from '../store/slices/relationShip';
 

export const useRelationShip = () => {
    const {  relationships, isLoading } = useSelector((state: RootState) => state.relationShipStore);
    const dispatch = useDispatch();

  const loadRelationShip = async ()  => {
      try {
        //  dispatch( removeError())
          dispatch( startRelationShipStore())
          // TODO: realizar peticion http
          const  objs:Relationship[] =  await relationShipAction();

          //Transformamos
          let selections: selectOption[] =( objs.map((obj) => ({
            key: obj._id.$oid,
            value: obj.name,
            disabled: false
          })));

          //enviamos al payload
          const payload =  {
            genders: selections
          }
          dispatch( relationShipLoadStore(payload) );
          dispatch( stopRelationShipStore() );
      } catch (error) {
           console.log(error)
      }
    }

    return {
      loadRelationShip,
       isLoading,
       relationships,
       
  }
}
