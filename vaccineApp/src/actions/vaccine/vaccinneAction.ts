import React from 'react'
import vaccinesApi from '../../config/api/vaccinesApi';
import { VaccineDependentPage } from '../../domain/entities/VaccineDependent';
import { VaccineDependentResponse } from '../../infrastructure/interfaces/vaccine-dependent-interface';
import { CheckCodeMapper } from '../../infrastructure/mappers/checkCode.mapper';
import { VaccineMapper } from '../../infrastructure/mappers/vaccine.mapper';



const returnMapper = ( data: VaccineDependentResponse ): VaccineDependentPage => {
    return  VaccineMapper.vaccineToEntity(data);
  }
  

  export const vaccinneAction = async (dependent_id: string):Promise<VaccineDependentPage >  => {
    try {
        const  { data }  = await vaccinesApi.get<VaccineDependentResponse>(`/vaccine/vaccdependent/${dependent_id}`);
        // let response = await vaccinesApi.post('/CheckCode', { phone, code } );
        // let {data} = response;
      return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      const data ={}
    //   data['message'] =   message;
    //   data['resp'] =   false;
      return data;
    }
  };

 