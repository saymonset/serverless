import { selectOption } from '../interfaces/select-option-interface';
import { Vaccine } from '../interfaces/vaccine-interfaces';
import { AuthState } from './AuthContext';

type  AuthAction = 
    | { type: 'signIn' }
    | { type: 'genderLoad', payload: { selections:selectOption[] } }
    | { type: 'relationshipLoad', payload: { selections:selectOption[] } }
    | { type: 'dosisLoad', payload: { selections:Dosiss[] } }
    | { type: 'vaccinesLoad', payload: { selections:Vaccine[] }}

export const authReducer = (state: AuthState, action: AuthAction) => {

   

    switch ( action.type) {
        case 'signIn':
            return {
                ...state,
                isLoggedIn: true,
                username:'no-username-yet'
            }
        case 'genderLoad':
                return {
                    ...state,
                    genders:action.payload.selections
            }
        case 'relationshipLoad':
                return {
                    ...state,
                    relationships:action.payload.selections
            }
        case 'dosisLoad':
                return {
                    ...state,
                    dosis:action.payload.selections
            }
        case 'vaccinesLoad':
                return {
                    ...state,
                    vaccines:action.payload.selections
            }
    
        default:
            return state;
    }
  
}

