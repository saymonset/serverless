import { VaccineDependentPage } from "../../domain/entities/VaccineDependent";
import { VaccineDependentResponse } from "../interfaces/vaccine-dependent-interface";

export class VaccineMapper {
    static vaccineToEntity( response: VaccineDependentResponse ):VaccineDependentPage {
      return {
        desde:    response.desde,
        limite:   response.limite,
        total:    response.total,
        vaccines: response.vaccines,
      }
    }
  }