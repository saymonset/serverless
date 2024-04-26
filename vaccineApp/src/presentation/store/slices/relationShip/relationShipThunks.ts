
import { AnyAction } from 'redux';
import { getGenders } from '../../../../actions/genderAction';
import { genderLoad, startGender, stopGender } from './relationShipSlice';


export const genderThunks = async (): AnyAction  => {
    return async ( dispatch, getState) => {
      try {
        //  dispatch( removeError())
          dispatch( startGender())
          // TODO: realizar peticion http
          const  genders =  await getGenders();

          console.log('---------------GENDER--------');
          console.log({genders});
          console.log('---------------GENDER---2-----');

          const payload =  {
            genders
          }
          dispatch( genderLoad(payload) );
          dispatch( stopGender(payload) );
      } catch (error) {
           console.log(error)
      }
    }
}