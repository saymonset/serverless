import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { authLogin } from '../../actions/auth/loginAction'
import { addError, loginStore, logOutStore, startLoginStore } from '../store/slices/login'
import { enviarMensajePorStatusCode } from '../screens/messages/enviarMensajePorStatusCode'

export const useLogin  = () => {

    const { status, user,token, message, isLoading } = useSelector((state: RootState) => state.loginStore);
    const dispatch = useDispatch();

    const login = async (ci: string,  password: string) => {
        try{
            dispatch( startLoginStore())
            const data = await authLogin(ci, password);
           
            const { message , resp, statusCode, usuario} = data?.user;

            if (!usuario){
              dispatch( addError(enviarMensajePorStatusCode(statusCode+'')))
              return;
            }
            
            if ( !resp) {
              dispatch( addError(enviarMensajePorStatusCode(statusCode+'')))
              return 
          }
            const payload = {
                user:data?.user,
                token: data?.token,
              };
    
            dispatch( loginStore(payload) );
        }catch(error){
           console.log(error)
           dispatch(logOutStore({}));

        }
          console.log({ci,   password});
    }

  return  {
    login,
    isLoading,
    status,
    user,
    token,
    message
  }
}
 
