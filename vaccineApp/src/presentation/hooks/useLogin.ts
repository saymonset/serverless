import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { authCheckStatusAction, authLoginAction } from '../../actions/auth/loginAction'
import { addError, loginStore, logOutStore, removeError, startLoginStore, tokenStore } from '../store/slices/login'
import { enviarMensajePorStatusCode } from '../screens/messages/enviarMensajePorStatusCode'
import { User } from '../../domain/entities/user';
import { StorageAdapter } from '../../config/adapters/storage-adapter'

export const useLogin  = () => {

    const { status, user,token, message, isLoading } = useSelector((state: RootState) => state.loginStore);
    const dispatch = useDispatch();

    const login = async (ci: string,  password: string) => {
    
        try{
            dispatch( startLoginStore())
           let {
              statusCode,
              token,
              usuario,
              more, 
              resp, 
              message
           } = await authLoginAction(ci, password);

           console.log('-------------1---------------')
           console.log({resp, statusCode})
           console.log('-------------2---------------')
           if (!usuario){
              dispatch( addError(enviarMensajePorStatusCode(statusCode+'')))
              return;
            }
            
            if ( !resp) {
              dispatch( addError(enviarMensajePorStatusCode(statusCode+'')))
              return 
          }

          let user: User = {
            statusCode,
            token,
            usuario,
            more, 
            resp, 
            message
          }

            const payload = {
                user,
                token,
              };
    
              if (token){
                StorageAdapter.setItem('token', token);
              }
              
            dispatch( loginStore(payload) );
        }catch(error){
           console.log(error)
           dispatch(logOutStore({}));

        }
       
    }
    const authCheckStatus = async (phone: string,  lastCode: number) => {
        try{
           let {
              statusCode,
              token,
              resp, 
              message
           } = await authCheckStatusAction(phone, lastCode);
         
          if ( !resp) {
           //dispatch( addError(enviarMensajePorStatusCode(statusCode+'')))
          //  Rmovemos error sin mensaje
          dispatch(removeError({}))
            return 
          }
          const payload = {
              token,
          };
          dispatch( tokenStore(payload) );
        }catch(error){
           dispatch(logOutStore({}));
        }
    }

   const logoutThunks = ()  => {
          StorageAdapter.removeItem('token');
          dispatch(logOutStore({}));
    }
   const removeMessage = ()  => {
    dispatch(removeError({}));
    }

  return  {
    login,
    authCheckStatus,
    logoutThunks,
    removeMessage,
    
    isLoading,
    status,
    user,
    token,
    message
  }
}
 
