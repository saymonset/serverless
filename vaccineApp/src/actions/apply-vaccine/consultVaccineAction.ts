import React from 'react'
import vaccinesApi from '../../config/api/vaccinesApi';
import { ConsultByIndependentEntity } from '../../domain/entities/ConsultByIndependentEntity';
import { ConsultByIndependentResponse } from '../../infrastructure/interfaces/consult-vaccine-response';
import { ApplyVaccineMapper } from '../../infrastructure/mappers/applyVaccine.mapper';




const returnMapper = ( data: ConsultByIndependentResponse ): ConsultByIndependentEntity => {
    return  ApplyVaccineMapper.consultVaccineToEntity(data);
  }


  export const consultVaccineAction = async ( limite:number = 1000, desde:number=0, dependentId: string):Promise<ConsultByIndependentEntity >  => {
    try {
       // const  { data }  = await vaccinesApi.get<ApplyVaccineResponse>(`/vaccine/vaccfindfromvaccidanddependetid/${vaccineId}/${dependentId}`)

        const { data } = await vaccinesApi.get<ConsultByIndependentResponse>(`/applyVaccines/${limite}/${desde}/${dependentId}`);
        // let response = await vaccinesApi.post('/CheckCode', { phone, code } );
        // let {data} = response;
      return returnMapper(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.log(error);
      return Promise.reject(message);
    }
  };

