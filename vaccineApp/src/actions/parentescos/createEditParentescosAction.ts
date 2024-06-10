import vaccinesApi from "../../config/api/vaccinesApi";
import { Relationship } from "../../domain/entities/ParentescoEntity";
import { Vaccine } from "../../domain/entities/VaccineDependent";
import { DosisEntity,  VaccineByIDEntity, VaccineEditCreateEntiy, VaccinePostEntity, VaccinePutEntity, VaccinePutPostResponseEntity } from "../../domain/entities/VaccineEditCreateEntity";
import { DosisByIDResponse } from "../../infrastructure/interfaces/create-edit-dosis-response";
import { VaccineByIDResponse, VaccineEditCreateResponse, VaccinePostResponse, VaccinePutResponse } from "../../infrastructure/interfaces/create-edit-vaccines-response";
import { CreateResponse, ParentescoResponse } from "../../infrastructure/interfaces/parentesco.response.interface";
import { VaccinesMapper } from "../../infrastructure/mappers/vaccines-mapper";




 


  const emptyParentesco: Relationship = {
    _id:              {$oid: ''},
    name:             '',
    status:          false,
  }


  export const getParentescoByIdAction = async (id:string):Promise<Relationship> => {
    try {
      if ( id === 'new' ) {
          return emptyParentesco;
      }
      const response = await vaccinesApi.get<Relationship>(`/relationships/${id}`);
      const { data } = response;
     
        return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      throw new Error(`Error getting by id: ${ id }`);
      
    }
  };

   

  export const deleteParentescoAction =  async (id:String) => {
    const { data }  = await vaccinesApi.delete(`/relationships/${ id }`);
    return data;
  }



export const getParentescoAction = async  (limite:number =1000, page:number, term:string = "''"):Promise<Relationship[] >  => {
    try {
      // console.log(`/vaccine/${limite}/${page}/${term}`);
        const { data } = await vaccinesApi.get<ParentescoResponse>(`/relationships/${limite}/${page}`);

           // Ordenar el array de vacunas por el nombre
        let result: Relationship[] =  data.relationships.sort((a, b) => a.name.localeCompare(b.name));


      return result ?? [];
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
    }
  };




export const updateCreateParentescoAction = ( parentesco: Partial<Relationship> ):Promise<Relationship >=> {

  if ( parentesco._id && parentesco._id.$oid !== 'new') {
    return updateParentesco(parentesco);
  }
  return createParentesco( parentesco );
}




//TODO: revisar si viene el usuario
const updateParentesco = async (parentesco: Partial<Relationship>):Promise<Relationship>  => {
  try {
   
      const { _id,  ...resto } = parentesco;
       
      const { $oid } = _id ?? { $oid : ''};

      const { name } = resto;
     
      const { data }= await vaccinesApi.put(`/relationships/${$oid}`, {...resto});
      const {statusCode, resp, message }= data;
      let updateRelatioShips = {
        _id: _id ?? { $oid : ''},
        name : name ?? '',
        status: true,
        statusCode,
        resp,
        message
    }
    return updateRelatioShips;
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
}
}

const createParentesco = async(parentesco: Partial<Relationship>):Promise<Relationship> => {
  try {
   
      let { _id,status,  ...resto } = parentesco;
      status = true;
      const { data } = await vaccinesApi.post<CreateResponse>(`/relationships`, {status, ...resto});

      const { id, name, statusCode, status:statusResponse, resp,message } = data;

      let newRelatioShips = {
        _id:    { $oid : id},
        name,
        statusCode,
        status: statusResponse,
        resp,
        message
    }

    return newRelatioShips;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
  }
}
 
