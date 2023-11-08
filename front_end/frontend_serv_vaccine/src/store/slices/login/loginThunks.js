import { AnyAction } from 'redux';

import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingLogin, setLoginResponse  } from './loginSlice'
import { LoginResponse } from '../../../interfaces'



export const getLogin = ( email, password ) => {
    return async ( dispatch, getState) => {
        dispatch( startLoadingLogin())
        // TODO: realizar peticion http
        const {data} = await vaccinesApi.post(`/login/mail`,{ email, password });
        console.log(JSON.stringify(data))
        dispatch( setLoginResponse(data) );
        //  let response = await vaccinesApi.post<UserResponse>('/users', {...user });
        //
    //    console.log({page})
       // console.log(JSON.stringify(ads))

        //
    }

}
 