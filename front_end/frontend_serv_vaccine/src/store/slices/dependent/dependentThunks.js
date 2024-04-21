import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vaccinesApi from '../../../api/vaccinesApi'
import {   startLoadingDependent, setDependentResponse, addMessage, removeMessage, loadDataDependent, setDependentById,
            setDependentDelete, clearDependent, stopLoadingDependent, editFalseDependent, deleteDataDependent } from './dependentSlice'
 import { Dependent, Dependentss, DesdeLimite, NextPrevioPage, PerfilFigma } from '../../../interfaces';
 import {  enviarMensajePorStatusCode } from '../../../utils/enviarMensajePorStatusCode'
 

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
      
          if(_id){
            const { _id, ...resto } = dependent;
            dependent = Object.assign({}, resto);
            data0 = await vaccinesApi.put(`/dependent/${_id}`, {...dependent});
          }else{
            data0 = await vaccinesApi.post(`/dependent/p`, {...dependent});
          }
          const {data} = data0;
          const { statusCode, message, resp, } = data;
        

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


export const clearDependenThunks = ( ): AnyAction  => {
  return async ( dispatch, getState) => {
       dispatch(clearDependent())  ;
  }
}

export const dependentThunksAddModify = ( dependent:Dependent, token , dependentsResume, total): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
   
      if (token) {
        await AsyncStorage.setItem('token', token ); 
      }
       
        dispatch( startLoadingDependent());
        let data0 =  {};
        let birthStr = '';
        const { _id, birth,  ...resto } = dependent;
        if (birth instanceof Date) {
            birthStr = birth.toISOString();
          // Resto del código...
        } else {
            // Manejar el caso en el que `birth` no sea de tipo `Date`
            birthStr = birth;
        }

        let idFind = _id;
        let totalNew =  total;

        if(_id){
          dependent = Object.assign({}, resto, { birth: birthStr });
          data0 = await vaccinesApi.put(`/dependent/${_id}`, {...dependent});
        }else{
          dependent = Object.assign({}, resto, { birth: birthStr });
          data0 = await vaccinesApi.post(`/dependent/p`, {...dependent});
        }
        const {data} = data0;
        
        let { statusCode, message, resp, age, dependentNew } = data;


        if (statusCode == 401 || !resp) {
            dispatch( addMessage( enviarMensajePorStatusCode(statusCode)))
            return 
        }
       
        // Si no es editar
        if (!_id && dependentNew && dependentNew["$oid"]){
              idFind = dependentNew["$oid"];
              totalNew = totalNew + 1;
              dependentNew : DependentsResume = {
                _id:  idFind,
                icon: "person-outline",
                name: dependent.name,
                lastname: dependent.lastname,
                isUser: dependent.isUser
            };
            dependentsResume = [...dependentsResume, dependentNew];
        }
      

        const payload: Dependent = {
            ...dependent,
            dependentsResume,
            age,
            message,
            resp,
            total : totalNew
            
          };
        dispatch( setDependentResponse(payload) );
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
}

export const dependentByIdThunks = ( id:String, token: String ): AnyAction  => {
  return async ( dispatch, getState) => {
    
    //Solo borramos el estado del redux para que los campos queden limpios
    //dispatch( clearDependent() );
 
    try {
      dispatch( startLoadingDependent());
      if (token) {
        await AsyncStorage.setItem('token', token ); 
      }
        const {data} = await vaccinesApi.get(`/dependent/${ id }`);
        const {result} = data;
        const payload = result;
              payload._id = id;
         dispatch( setDependentById(payload) );
         dispatch( stopLoadingDependent() );
         
 
       
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
}

export const editFalseDependentThunks = (): AnyAction  => {
    return async ( dispatch, getState) => {
        dispatch( editFalseDependent());
     }
  }


export const dependentDeleteThunks = ( id:String, token: String, dependentsResume: DependentsResume[] ): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
      if (token) {
        await AsyncStorage.setItem('token', token ); 
      }
          dispatch( startLoadingDependent());
          const {data} = await vaccinesApi.delete(`/dependent/${ id }`);
          const payload = data;
         dispatch( setDependentDelete(payload) );
         if (dependentsResume && dependentsResume.length > 0){
              dependentsResume = dependentsResume.filter(( item ) => item._id != id);
             const  payload = {
                dependentsResume
              };
              dispatch( deleteDataDependent(payload));
              dispatch( stopLoadingDependent());
         }
       
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
}


export const beforedependentAddThunks = (  ): AnyAction  => {
  return async ( dispatch, getState) => {
        dispatch( startLoadingDependent());
        await dispatch( clearDependent() );
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



export const loadDataThunks = ( desdeLimite: DesdeLimite, currentPage = 1, nextPrev, token, term): AnyAction  => {
  return async ( dispatch, getState) => {
    try {
     if (token) {
       await AsyncStorage.setItem('token', token ); 
     }
     
      dispatch( startLoadingDependent());
      const { desde, limite } = desdeLimite;
      if (!term){
        //Se coloca '' para que el backend reconozca que es una cadena vacia
        term = "''";
      }
      const {data} = await vaccinesApi.get(`/dependent/${limite}/${desde}/${term}`);

      const { dependents, total, error } = data;
       // Scamos un resumen de la data dependents y le agregamos un icono
       let dependentsResume: DependentsResume[] = [];

       if (dependents){
           dependentsResume = dependents.map(item => ({
               _id:  item["_id"]["$oid"],
               icon: "person-outline",
               name: item.name,
               lastname: item.lastname,
               isUser: item.isUser
           }));
       }
      if (error) {
        dispatch( addMessage("Error: "+JSON.stringify(error)))
        return 
      }
      currentPage = whereGo (nextPrev, total, currentPage);
      const payload: Dependentss = {
        dependents,
        dependentsResume,
        birth:'',
        desde,
        limite,
        currentPage,
        total
      };
    
      dispatch( loadDataDependent(payload) );
      dispatch( stopLoadingDependent());
    } catch (error) {
         dispatch( addMessage("Error: "+error))
    }
  }
} 
 

 
export const removeErrorThunks = (dispatch): AnyAction => {
       
      dispatch(removeMessage());
      return
  };
  