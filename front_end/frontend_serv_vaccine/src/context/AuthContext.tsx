import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import vaccinesApi from '../api/vaccinesApi';

import { Usuario, LoginResponse, LoginData, RegisterData, UserResponse } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';
import { CheckcCodeRequest, CheckcCodeResponse, LoginVaccineResponse, SendSmsRequest, SendSmsResponse} from '../interfaces/vaccinesinterface';
import { ImageComponent } from 'react-native/types';

type AuthContextProps = {
    isSendCode: boolean  | null;
    phone:      string | null;
    errorMessage: string;
    successfullMessage: string;
    token: string | null;
    user: Usuario | null;
    moreinfouser: More | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: ( registerData: RegisterData ) => void;
    signIn: ( loginData: LoginData ) => void;
    logOut: () => void;
    removeError: () => void;
    sendSms: (sendSmsRequest:SendSmsRequest) => void;
    resetSendSms: () => void;
    checkCode: (checkcCodeRequest:CheckcCodeRequest) => void;
    beforeCheckCode: () => void;
    userAdd: (user: UserRequest) => void;
   

}

const authInicialState: AuthState = {
    isSendCode:   false,
    phone: '',
    status: 'checking',
    token: null,
    user: null,
    moreinfouser: null,
    errorMessage: '',
    successfullMessage: ''
}



export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any)=> {

    const [ state, dispatch ] = useReducer( authReducer, authInicialState);

    useEffect(() => {
        checkToken();
    }, [])


    const userAdd = async(user: Usuario) => {

        {/** Viene el token cuando chequeas el code*/}
        const { token } = user;
        if (token){
            await AsyncStorage.setItem('token', token ); 
        }
            
        
        // const headers = {
        //     Authorization: `Bearer ${user.token}`,
        // };

     
        
        try {
            let response = await vaccinesApi.post<UserResponse>('/users', {...user });
            const {data} = response;
             const { resp, error:errorbackend = '', message = ''} = data; 
             console.log('hay vamos!!')
             console.log({data})
             {/* cambiamos status para el loader que muestre al usuario en espera*/}
        
             //  En caso de error
             if( !resp || (errorbackend && errorbackend.length > 0 )){
                dispatch({ 
                    type: 'addError', 
                    payload: errorbackend
                })
                return;
             }

              //  En caso todo marche bien
            dispatch({ 
                type: 'userAdd' ,
                payload: message
            });
          
            //await AsyncStorage.setItem('token', data.token );
          } catch (error) {
            if (error?.response) {
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
}

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
          await AsyncStorage.removeItem('token');
          dispatch({ 
            type: 'resetSendSms'
        });
    };
      {/* end reset send sms */} 

  {/* send sms  */} 
    const sendSms = async({ phone }: SendSmsRequest ) => {

        try {
                 await AsyncStorage.removeItem('token');
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
                
            
                ads
                titulo
                Imagen,
                link
              
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
        const resp = await vaccinesApi.get('/auth');
        if ( resp.status !== 200 ) {
            return dispatch({ type: 'notAuthenticated' });
        }
        
        await AsyncStorage.setItem('token', resp.data.token );
        dispatch({ 
            type: 'signUp',
            payload: {
                token: resp.data.token,
                user: resp.data.usuario,
            }
        });
    }


    const signIn = async({ email, password }: LoginData ) => {

        try {
            const { data } = await vaccinesApi.post<LoginVaccineResponse>('/login/mail', { email, password } );
           
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                    more: data.more
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
    
    const signUp = async( { nombre, email, password }: RegisterData ) => {

        try {
         
            const { data } = await vaccinesApi.post<LoginVaccineResponse>('/usuarios', { email, password, nombre } );
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario,
                    more: data.more
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
            beforeCheckCode,
            userAdd
        }}>
            { children }
        </AuthContext.Provider>
    )

}


