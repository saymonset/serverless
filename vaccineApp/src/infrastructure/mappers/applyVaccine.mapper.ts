import { ApplyVaccineEntity } from "../../domain/entities/apply-vaccine-interface";
import { ConsultByIndependentEntity } from "../../domain/entities/ConsultByIndependentEntity";
import { ApplyVaccineResponse } from "../interfaces/apply-vaccine-response";
import { ConsultByIndependentResponse } from "../interfaces/consult-vaccine-response";

export class ApplyVaccineMapper {
    static applyVaccineToEntity( response:  ApplyVaccineResponse):ApplyVaccineEntity {
      return {
        vacc_apply_vaccines: response.vacc_apply_vaccines,
        statusCode:          response.statusCode,
        resp:                response.resp
 
      }
    }
    static consultVaccineToEntity( response:  ConsultByIndependentResponse):ConsultByIndependentEntity {
      return {
        apply_vaccines: response.apply_vaccines,
        desde:          response.desde,
        limite:         response.limite,
        resp:           response.resp,
        statusCode:     response.statusCode,
        total:          response.total
 
      }
    }
  }


 