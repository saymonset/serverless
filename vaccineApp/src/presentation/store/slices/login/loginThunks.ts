import { authLoginAction } from '../../../../actions/auth/loginAction';
import { loginStore, logOutStore, startLoginStore } from './loginSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
 

// export const loginCiThunks = createAsyncThunk(
//   'login/loginCiThunks',
//   async (credentials: { ci: string; password: string }, { dispatch }) => {
//     dispatch(startLoginStore());
//     try {
//       const resp = await authLoginAction(credentials.ci, credentials.password);
//       const payload = {
//         user: resp?.user,
//         token: resp?.token,
//       };
//       dispatch(loginStore(payload));
//       return payload; // Return the payload if needed
//     } catch (error) {
//       console.log(error);
//       dispatch(logOutStore({}));
//       throw error; // Throw the error to be handled by the caller
//     }
//   }
// );

// export const loginCiThunks =  ( ci: string, password:string ) : AnyAction => {
//   return async( dispatch, getState)=>{
//         dispatch(  startLoginStore() );
//   }
  
//     // try {
//     //   const dispatch = useDispatch();
//     //     dispatch( startLoadingLogin())

//     //    console.log('--------aja--------1-------');
//     //     const resp = await authLogin(ci, password);
//     //     console.log('--------aja--------2-------');
//     //     console.log({resp});

      
//     //     const payload = {
//     //         user:resp?.user,
//     //         token: resp?.token,
//     //       };

//     //     dispatch( login(payload) );
        
//     // } catch (error) {
//     //     // dispatch( addError("Error: "+error))
//     // }
// }
 