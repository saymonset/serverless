import { DosisEntity, VaccineByIDEntity, VaccineEditCreateEntiy, VaccinePostEntity, VaccinePutEntity, VaccinePutPostResponseEntity } from '../../domain/entities/VaccineEditCreateEntity';
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
     
    static dosisByvaccineByIDToEntity(response: VaccineByIDResponse): DosisEntity[] {
      // Verificar si response.dosis_ids está definido y no es un array vacío
      if (response.dosis_ids && response.dosis_ids.length > 0) {
          // Mapear los datos de VaccineByIDResponse a DosisEntity
          return response.dosis_ids.map(dosis => {
              return {
                //DATOS DE LA VACUNA
                  vaccineID:               response._id,
                  vaccineName:             response.name,
                  vaccineDescription:      response.description,
                  vaccineDisease_prevents: response.disease_prevents,
                  vaccineApplication_age:  response.application_age,
                  vaccineIsChildren:       response.isChildren,
                  vaccineStatus:          response.status,
                //DATOS DE LA DOSIS
                  _id: dosis._id,
                  vacinne_id:response._id.$oid, // Asignar el id de la vacuna de la respuesta original
                  name: dosis.name,
                  age_frequency: dosis.age_frequency,
                  status: dosis.status,
                  columReporte: dosis.columReporte,
                  rowReporte: dosis.rowReporte,
                  expires_in_days: dosis.expires_in_days
              };
          });
      } else {
          // Devolver un array vacío si response.dosis_ids no está definido o es un array vacío
          return [];
      }
  }
  

}

 