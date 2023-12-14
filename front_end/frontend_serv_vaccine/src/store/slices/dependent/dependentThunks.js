import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingDependent, setDependentResponse, addMessage, removeMessage, loadDataDependent, setDependentById, setDependentDelete  } from './dependentSlice'
 import { Dependent, Dependentss, DesdeLimite, NextPrevioPage } from '../../../interfaces';
 import { UseHandlerPag } from '../../../hooks/useHandlerPag';


export const dependentThunks = ( dependent:Dependent, token: String, loginResponse: LoginResponse ): AnyAction  => {
    return async ( dispatch, getState) => {
      try {
        if (token) {
          await AsyncStorage.setItem('token', token ); 
        }
          dispatch( startLoadingDependent());
          let data0 =  {};
          const {_id} = dependent;
          let { usuario } = loginResponse;
          let {_id:{$oid}} = usuario;
          dependent['user_id']=$oid;

         //console.log({$oid})
          if(_id){
            const { _id, ...resto } = dependent;
            dependent = Object.assign({}, resto);
            console.log({...dependent})
            data0 = await vaccinesApi.put(`/dependent/${_id}`, {...dependent});
          }else{
            data0 = await vaccinesApi.post(`/dependent/p`, {...dependent});
          }
          const {data} = data0;
          const { statusCode, message, resp, } = data;

          console.log({data})

          if (statusCode == 401 || !resp) {
              dispatch( addMessage("Error: "+JSON.stringify(data)))
              return 
          }
          const payload: Dependent = {
              ...dependent,
              message,
              resp
              
            };
          dispatch( setDependentResponse(payload) );
      } catch (error) {
           dispatch( addMessage("Error: "+error))
      }
    }
}

export const dependentByIdThunks = ( id:String, token: String ): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
      if (token) {
        await AsyncStorage.setItem('token', token ); 
      }
        const {data} = await vaccinesApi.get(`/dependent/${ id }`);
        const {result} = data;
        const payload = result;
              payload._id = id
         dispatch( setDependentById(payload) );
       
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
}

export const dependentDeleteThunks = ( id:String, token: String ): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
      if (token) {
        await AsyncStorage.setItem('token', token ); 
      }
        dispatch( startLoadingDependent());
        const {data} = await vaccinesApi.delete(`/dependent/${ id }`);
        const payload = data;
         dispatch( setDependentDelete(payload) );
       
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
}

export const dependentAddThunks = ( token: String ): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
      if (token) {
        await AsyncStorage.setItem('token', token ); 
      }
        const payload = { name:'', lastname:'', phone:'',  email:'',  birth: new Date().toISOString(), gender_id:'',
        relationship_id:'', status:true}
        dispatch( setDependentById(payload) );
       
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
}

const handlePreviousPage =  (total, currentPage) => {
  if (currentPage > 1) {
    return currentPage = currentPage -1;
  }
  return currentPage;
};
 

const handleNextPage =  (total, currentPage) => {
  
  if (currentPage < total) {
     return currentPage = currentPage + 1;
  }
  return currentPage;
};

const whereGo =   (nextPrevioPage, total, currentPage) => {
  const { nextPage } = nextPrevioPage;
 switch (nextPage) {
       case 'next':
         // Lógica para ir a la siguiente página
         return handleNextPage(total, currentPage);
         break;
       case 'prev':
         // Lógica para ir a la página anterior
         return handlePreviousPage(total, currentPage);
         break;
       case 'none':
         // Lógica para no realizar ninguna acción
         return currentPage = 1;
         break;
       default:
         break;
     }
     return currentPage;
}

export const loadDataThunks = ( desdeLimite: DesdeLimite, currentPage = 1, nextPrev, token): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
     if (token) {
       await AsyncStorage.setItem('token', token ); 
     }
     
      dispatch( startLoadingDependent());
      const { desde, limite } = desdeLimite;
     
      const {data} = await vaccinesApi.get(`/dependent/${limite}/${desde}`);
     
      const { dependents, total, error } = data;
      if (error) {
        dispatch( addMessage("Error: "+JSON.stringify(error)))
        return 
      }
      currentPage = whereGo (nextPrev, total, currentPage);
      const payload: Dependentss = {
        dependents,
        birth:'',
        desde,
        limite,
        currentPage,
        total
      };
    
      dispatch( loadDataDependent(payload) );
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
} 
 

 
export const removeErrorThunks = (dispatch): AnyAction => {
       
      dispatch(removeMessage());
      return
  };
  