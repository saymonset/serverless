import React from 'react'
import vaccinesApi from '../../config/api/vaccinesApi';
import { ApplyVaccineEntity } from '../../domain/entities/apply-vaccine-interface';
import { ApplyVaccineResponse } from '../../infrastructure/interfaces/apply-vaccine-response';
import { ApplyVaccineMapper } from '../../infrastructure/mappers/applyVaccine.mapper';




const returnMapper = ( data: ApplyVaccineResponse ): ApplyVaccineEntity => {
    return  ApplyVaccineMapper.applyVaccineToEntity(data);
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
      const data ={}
    //   data['message'] =   message;
    //   data['resp'] =   false;
      return data;
    }
  };