import vaccinesApi from "../../config/api/vaccinesApi";
import { DosisByIdEntity } from "../../domain/entities/DosisEditCreateEntity";
import {   Vaccine } from "../../domain/entities/VaccineEditCreateEntity";
import { DosisByIDResponse, DosisCreateResponse, DosisUpdateResponse } from "../../infrastructure/interfaces/create-edit-dosis-response";
 
import { DosisMapper } from "../../infrastructure/mappers/dosis-mapper";

 

  const emptDosis: DosisByIdEntity = {
    _id:            {$oid: ''},
    name:            '',
    age_frequency:   '',
    expires_in_days: 0,
    status:          true,
    rowReporte:     '',
    columReporte:    '',
    vacinne_id:         '',
  }


  export const getDosisByIdAction = async (id:string):Promise<DosisByIdEntity> => {
    try {
      if ( id === 'new' ) {
          return emptDosis;
      }
      const response = await vaccinesApi.get<DosisByIDResponse>(`/dosis/${id}`);
      const { data } = response;
     
        return returnDosisByIDMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      throw new Error(`Error getting by id: ${ id }`);
      
    }
  };

 

 
 



export const updateCreateDosisAction = ( dosis: Partial<DosisByIdEntity> ):Promise<DosisByIdEntity >=> {

 
  if ( dosis._id && dosis._id.$oid !== 'new') {
   
    return updateDosis(dosis);
  }
   
  return createDosis( dosis );
}




// //TODO: revisar si viene el usuario
const updateDosis = async (dosis: Partial<DosisByIdEntity>):Promise<DosisByIdEntity>  => {
  try {
   
      let { _id, expires_in_days:expires_in_daysStr,  ...resto } = dosis;

      let expires_in_days = isNaN( Number(expires_in_daysStr)) ? 0 : Number(expires_in_daysStr);
       
      const { $oid } = _id ?? { $oid : ''};
     
      const { data }= await vaccinesApi.put<DosisUpdateResponse>(`/dosis/${$oid}`, {expires_in_days,...resto});
      
    return returnUpdateMapper({_id, ...data});
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
}
}

const createDosis = async(dosis: Partial<DosisByIdEntity>):Promise<DosisByIdEntity> => {
  try {
   
      let { _id,status, expires_in_days:expires_in_daysStr,  ...resto } = dosis;
      let expires_in_days = isNaN( Number(expires_in_daysStr)) ? 0 : Number(expires_in_daysStr);
      status = true;
    
      const { data } = await vaccinesApi.post<DosisCreateResponse>(`/dosis`, {status, expires_in_days, ...resto});
    return returnCreaterMapper(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
  }
}

 

const returnUpdateMapper = ( data: DosisUpdateResponse ): DosisByIdEntity => {
  return  DosisMapper.updateVaccineToEntity(data);
}

const returnCreaterMapper = ( data: DosisCreateResponse ): DosisByIdEntity => {
  return  DosisMapper.createDosisToEntity(data);
}

const returnDosisByIDMapper = ( data: DosisByIDResponse ): DosisByIdEntity => {
  return  DosisMapper.vaccineByIDToEntity(data);
}

