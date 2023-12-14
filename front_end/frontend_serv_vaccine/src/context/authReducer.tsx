import { selectOption } from '../interfaces/select-option-interface';
import { AuthState } from './AuthContext';

type  AuthAction = 
    | { type: 'signIn' }
    | { type: 'genderLoad', payload: { selections:selectOption[] } }
    | { type: 'relationshipLoad', payload: { selections:selectOption[] } }

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
    
        default:
            return state;
    }
  
}

