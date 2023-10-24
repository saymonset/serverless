import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cafeApi from '../api/cafeApi';
import vaccinesApi from '../api/vaccinesApi';

import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
import { CheckcCodeRequest, CheckcCodeResponse, LoginVaccineResponse, SendSmsRequest, SendSmsResponse } from '../interfaces/vaccinesinterface';

type AuthContextProps = {
    isSendCode: boolean  | null;
    phone:      string | null;
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
    sendSms: (sendSmsRequest:SendSmsRequest) => void;
    resetSendSms: () => void;
    checkCode: (checkcCodeRequest:CheckcCodeRequest) => void;
    beforeCheckCode: () => void;
   

}

const authInicialState: AuthState = {
    isSendCode:   false,
    phone: '',
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
}



export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any)=> {

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])


    const beforeCheckCode = async() => {
                 //  En caso todo marche bien
                 dispatch({ 
                    type: 'beforeCheckCode',
                });
    }

    {/* send sms  */} 
    const checkCode = async({ phone='', code='' }: CheckcCodeRequest ) => {

        try {
                let response = await vaccinesApi.post<CheckcCodeResponse>('/CheckCode', { phone, code } );
                const {data} = response;
                 const { resp, message, token=null} = data; 
               
                 {/* cambiamos status para el loader que muestre al usuario en espera*/}
                //  dispatch({ 
                //     type: 'beforeCheckCode'
                // })
                 //  En caso de error
                 if( !resp ){
                    dispatch({ 
                        type: 'addError', 
                        payload: message || 'Code escrito de manera incorrecta'
                    })
                    return;
                 }

                  //  En caso todo marche bien
                dispatch({ 
                    type: 'checkCode',
                    payload: {
                        token
                    }
                });
                
                console.log(`Logueado ${token}`)
              
                //await AsyncStorage.setItem('token', data.token );
              } catch (error) {
                if (error.response) {
                  // El servidor respondió con un estado de error (por ejemplo, 404, 500)
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // La solicitud fue realizada pero no se recibió ninguna respuesta
                  console.log(error.request);
                } else {
                  // Ocurrió un error al configurar la solicitud
                  console.log('Error', error.message);
                }
                    //     console.log(error)
                    dispatch({ 
                        type: 'addError', 
                        payload: error.response.data.msg || 'Información incorrecta'
                    })
              }
    };
      {/* end send sms */} 

     {/* resetSendSms sms  */} 
     const resetSendSms = async() => {
          //  En caso todo marche bien
          dispatch({ 
            type: 'resetSendSms'
        });
    };
      {/* end reset send sms */} 

  {/* send sms  */} 
    const sendSms = async({ phone }: SendSmsRequest ) => {

        try {
                let response = await vaccinesApi.post<SendSmsResponse>('/sendSms', { phone } );
                const {data} = response;
                 const { resp, message, error} = data; 

             
                 
               
                 //  En caso de error
                 if( !resp ){
                    dispatch({ 
                        type: 'addError', 
                        payload: message || error || 'Telefono escrito de manera incorrecta'
                    })
                    return;
                 }

                  //  En caso todo marche bien
                dispatch({ 
                    type: 'sendSms',
                    payload: {
                        isSendCode: true,
                        phone
                    }
                });
                
              
                //await AsyncStorage.setItem('token', data.token );
              } catch (error) {
                if (error.response) {
                  // El servidor respondió con un estado de error (por ejemplo, 404, 500)
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  // La solicitud fue realizada pero no se recibió ninguna respuesta
                  console.log(error.request);
                } else {
                  // Ocurrió un error al configurar la solicitud
                  console.log('Error', error.message);
                }
                    //     console.log(error)
                    dispatch({ 
                        type: 'addError', 
                        payload: error.response.data.msg || 'Información incorrecta'
                    })
              }
    };
      {/* end send sms */} 

    const checkToken = async() => {
        const token = await AsyncStorage.getItem('token');
        
        // No token, no autenticado
        if ( !token ) return dispatch({ type: 'notAuthenticated' });

        // Hay token
        const resp = await cafeApi.get('/auth');
        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }
        
        await AsyncStorage.setItem('token', resp.data.token );
        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario
            }
        });
    }


    const signIn = async({ correo, password }: LoginData ) => {

        try {
            let dataVaccine = await vaccinesApi.post<LoginVaccineResponse>('/login', { ci:'123456', password } );
            const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password } );
           
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem('token', data.token );

        } catch (error) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.msg || 'Información incorrecta'
            })
        }
    };
    
    const signUp = async( { nombre, correo, password }: RegisterData ) => {

        try {
         
            const { data } = await cafeApi.post<LoginResponse>('/usuarios', { correo, password, nombre } );
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem('token', data.token );

        } catch (error) {
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.errors[0].msg || 'Revise la información'
            });
        }

    };

    const logOut = async() => {
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'logout' });
    };

    const removeError = () => {
        dispatch({ type: 'removeError' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            logOut,
            removeError,
            sendSms,
            resetSendSms,
            checkCode,
            beforeCheckCode
        }}>
            { children }
        </AuthContext.Provider>
    )

}


