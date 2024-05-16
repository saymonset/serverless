import { VaccineByIDEntity, VaccineEditCreateEntiy, VaccinePostEntity, VaccinePutEntity, VaccinePutPostResponseEntity } from '../../domain/entities/VaccineEditCreateEntity';
import { ApplyVaccineCreateResponse } from "../interfaces/apply-vaccine-response"
import { VaccineByIDResponse, VaccineEditCreateResponse, VaccinePostResponse, VaccinePutResponse } from "../interfaces/create-edit-vaccines-response"

export class VaccinesMapper {
  
 
    static getVaccinesToEntity( response:  VaccineEditCreateResponse):VaccineEditCreateEntiy {
      return {
        desde:    response.desde,
        limite:   response.limite,
        total:    response.total,
        vaccines: response.vaccines
      }
    }

  
    static createVaccineToEntity( response:  VaccinePostResponse):VaccinePutPostResponseEntity {
      return {
            _id: {
                        $oid:  response.id ? response.id  : ''
                    },
            error:       false,
            resp:        true,
            TypeError:   '',
            statusCode:  0,
            ValueError:  '',
            message:     '',
      }
    }
    static updateVaccineToEntity( response:  VaccinePutResponse):VaccinePutPostResponseEntity {
      return {
        _id:     response._id ?? {
                                      $oid: ''
                                  },
        error:      response.error ?? false,
        resp:       response.resp ?? false,
        TypeError:  response.TypeError ?? '',
        statusCode: 0,
        ValueError: response.ValueError ?? '',
        message:    response.message ?? '',
      }
    }

    static vaccineByIDToEntity( response:  VaccineByIDResponse):VaccineByIDEntity {
      return {
        _id:              response._id,
        name:             response.name,
        description:      response.description,
        disease_prevents: response.disease_prevents,
        application_age:  response.application_age,
        isChildren:       response.isChildren,
        status:           response.status,
        dosis_ids:       response.dosis_ids
      }
    }

  }