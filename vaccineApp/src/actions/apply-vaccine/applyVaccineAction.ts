import { AxiosResponse } from 'axios';
import React from 'react'
import vaccinesApi from '../../config/api/vaccinesApi';
import { ApplyVaccineEntity } from '../../domain/entities/apply-vaccine-interface';
 
import { ApplyVaccineCreateResponse, ApplyVaccineResponse } from '../../infrastructure/interfaces/apply-vaccine-response';
import { ApplyVaccineMapper } from '../../infrastructure/mappers/applyVaccine.mapper';




const returnMapper = ( data: ApplyVaccineResponse ): ApplyVaccineEntity => {
    return  ApplyVaccineMapper.applyVaccineToEntity(data);
  }

  const returnCreaterMapper = ( data: ApplyVaccineCreateResponse ): ApplyVaccineCreateResponse => {
    return  ApplyVaccineMapper.createVaccineToEntity(data);
  }
  
  
  const emptyApplyVaccine: ApplyVaccineCreateResponse = {
  
    dosis_id:       '',
    dependent_id:       '',
    lote:              '',
    vaccination_date:    new Date(),
    image:            '',
    status:           true,
  }

  export const getApplyVaccineAction = async (id:string = 'new'):Promise<ApplyVaccineCreateResponse> => {
    try {
      
      if ( id === 'new' ) {
          return emptyApplyVaccine;
      }
      return emptyApplyVaccine;
      // const response = await vaccinesApi.get<DependentIDResponseBD>(`/dependent/${id}`);
      // const { data } = response;
      //   return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
     
      throw new Error(`Error getting by id: ${ id }`);
      
    }
  };

  export const updateCreateApplyVaccinneAction = ( applyVaccine: Partial<ApplyVaccineCreateResponse> )=> {

    // product.stock = isNaN( Number(product.stock)) ? 0 : Number(product.stock);
    // product.price = isNaN( Number(product.price)) ? 0 : Number(product.price);
    
    if ( applyVaccine.dependent_id && applyVaccine.dependent_id !== 'new') {
    
      return create(applyVaccine);
    }
  
    return create( applyVaccine );
  
  }

  const create = async(applyVaccine: Partial<ApplyVaccineCreateResponse>):Promise<ApplyVaccineCreateResponse> => {
    try {
        let vaccination_dateStr = '' ;
        console.log({...applyVaccine })
        const {  vaccination_date,  ...resto } = applyVaccine;
        if (vaccination_date instanceof Date) {
          vaccination_dateStr = vaccination_date.toISOString();
        } else{
          vaccination_dateStr = vaccination_date ?? '';
        }
     
        let applyVaccine0 = Object.assign({}, resto, { vaccination_date: vaccination_dateStr });
       
        const  { data }  = await vaccinesApi.post(`/applyVaccines/`, { ...applyVaccine });
       
      return returnCreaterMapper( data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
    }
  }

  

  export const applyVaccinneAction = async (vaccineId:string, dependentId: string):Promise<ApplyVaccineEntity >  => {
    try {
        const  { data }  = await vaccinesApi.get<ApplyVaccineResponse>(`/vaccine/vaccfindfromvaccidanddependetid/${vaccineId}/${dependentId}`);
        // let response = await vaccinesApi.post('/CheckCode', { phone, code } );
        // let {data} = response;
      return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
    }
  };