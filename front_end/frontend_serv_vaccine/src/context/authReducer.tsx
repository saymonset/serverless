import { Usuario } from '../interfaces/appInterfaces';
import { More } from '../interfaces/vaccinesinterface';

export interface AuthState {
    isSendCode: boolean  | null;
    phone:      string | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    successfullMessage: string;
    user: Usuario | null;
    moreinfouser: More | null;
}

type AuthAction = 
    | { type: 'beforeCheckCode'}
    | { type: 'checkCode', payload: { token: string | null } }
    | { type: 'sendSms', payload: { isSendCode: boolean, phone: string } }
    | { type: 'resetSendSms'}
    | { type: 'signUp', payload: { token: string, user: Usuario, more: More} }
    | { type: 'addError', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }
    | { type: 'userAdd', payload: string }
    

    


export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch (action.type) {
        
        case 'userAdd':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                successfullMessage:action.payload,
            }
        case 'beforeCheckCode':
            return {
                ...state,
                status: 'checking',
            }
        case 'checkCode':
            return {
                ...state,
                status: 'not-authenticated',
                token: action.payload.token,
            }
        case 'resetSendSms':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
                isSendCode: false,
                phone: null
            }
        case 'sendSms':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null,
                isSendCode: action.payload.isSendCode,
                phone: action.payload.phone
            }
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }
     
    
        case 'removeError':
            return {
                ...state,
                errorMessage: '',
                successfullMessage:''
            };

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                moreinfouser: action.payload.more
            }

        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }

        default:
            return state;
    }


}


