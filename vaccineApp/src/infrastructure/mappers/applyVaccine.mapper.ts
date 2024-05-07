import { ApplyVaccineEntity } from "../../domain/entities/apply-vaccine-interface";
import { ApplyVaccineResponse } from "../interfaces/apply-vaccine-response";

export class ApplyVaccineMapper {
    static applyVaccineToEntity( response:  ApplyVaccineResponse):ApplyVaccineEntity {
      return {
        vacc_apply_vaccines: response.vacc_apply_vaccines,
        statusCode:          response.statusCode,
        resp:                response.resp
 
      }
    }
  }


 