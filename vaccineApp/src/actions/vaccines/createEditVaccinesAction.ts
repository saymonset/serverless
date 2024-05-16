import vaccinesApi from "../../config/api/vaccinesApi";
import { Vaccine, VaccineByIDEntity, VaccineEditCreateEntiy, VaccinePostEntity, VaccinePutEntity, VaccinePutPostResponseEntity } from "../../domain/entities/VaccineEditCreateEntity";
import { VaccineByIDResponse, VaccineEditCreateResponse, VaccinePostResponse, VaccinePutResponse } from "../../infrastructure/interfaces/create-edit-vaccines-response";
import { VaccinesMapper } from "../../infrastructure/mappers/vaccines-mapper";











  const emptyVaccine: VaccineByIDResponse = {
    _id:              {$oid: ''},
    name:             '',
    description:       '',
    disease_prevents:  '',
    application_age:  '',
    isChildren:       false,
    status:          false,
    dosis_ids:        []
  }


  export const getVaccineByIdAction = async (id:string):Promise<VaccineByIDEntity> => {
    try {
      if ( id === 'new' ) {
          return emptyVaccine;
      }
      const response = await vaccinesApi.get<VaccineByIDResponse>(`/vaccine/${id}`);
      const { data } = response;
        return returnVaccineByIDMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      throw new Error(`Error getting by id: ${ id }`);
      
    }
  };



export const getVaccinesAction = async  (limite:number =1000, page:number, term:string = "''"):Promise<Vaccine[] >  => {
    try {
        const { data } = await vaccinesApi.get<VaccineEditCreateResponse>(`/vaccine/${limite}/${page}/${term}`);
      return returnGetsVaccinesMapper(data).vaccines;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
    }
  };




export const updateCreateVaccineAction = ( vaccine: Partial<Vaccine> ):Promise<VaccinePutPostResponseEntity >=> {

  if ( vaccine._id && vaccine._id.$oid !== 'new') {
    return updateVaccine(vaccine);
  }
  return createVaccine( vaccine );
}




//TODO: revisar si viene el usuario
const updateVaccine = async (vaccine: Partial<Vaccine>):Promise<VaccinePutPostResponseEntity>  => {
  try {
   
      const { _id,  ...resto } = vaccine;
       
      const { $oid } = _id ?? { $oid : ''};
     
      const { data }= await vaccinesApi.put(`/vaccine/${$oid}`, {...resto});
    return returnUpdateMapper({_id, ...data});
    
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
}
}

const createVaccine = async(vaccine: Partial<Vaccine>):Promise<VaccinePutPostResponseEntity> => {
  try {
   
      const { _id,  ...resto } = vaccine;
      const { data } = await vaccinesApi.post<VaccinePostResponse>(`/vaccine`, {...resto});
    return returnCreaterMapper(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
  }
}

const returnGetsVaccinesMapper = ( data: VaccineEditCreateResponse ): VaccineEditCreateEntiy => {
  return  VaccinesMapper.getVaccinesToEntity(data);
}

const returnUpdateMapper = ( data: VaccinePutResponse ): VaccinePutPostResponseEntity => {
  return  VaccinesMapper.updateVaccineToEntity(data);
}

const returnCreaterMapper = ( data: VaccinePostResponse ): VaccinePutPostResponseEntity => {
  return  VaccinesMapper.createVaccineToEntity(data);
}

const returnVaccineByIDMapper = ( data: VaccineByIDResponse ): VaccineByIDEntity => {
  return  VaccinesMapper.vaccineByIDToEntity(data);
}
