import { DosisByIdEntity } from '../../domain/entities/DosisEditCreateEntity';
import { DosisEntity, VaccineByIDEntity, VaccinePostEntity, VaccinePutEntity, VaccinePutPostResponseEntity } from '../../domain/entities/VaccineEditCreateEntity';
import { ApplyVaccineCreateResponse } from "../interfaces/apply-vaccine-response"
import { DosisByIDResponse, DosisCreateResponse, DosisUpdateResponse } from '../interfaces/create-edit-dosis-response';
import { VaccineEditCreateResponse, VaccinePostResponse, VaccinePutResponse } from "../interfaces/create-edit-vaccines-response"

export class DosisMapper {
  
 
    // static getVaccinesToEntity( response:  VaccineEditCreateResponse):DosisByIdEntity {
    //   return {
    //     desde:    response.desde,
    //     limite:   response.limite,
    //     total:    response.total,
    //     vaccines: response.vaccines
    //   }
    // }

  
    static createDosisToEntity( response:  DosisCreateResponse):DosisByIdEntity {
      return {
            _id: {
                        $oid:  response.id ? response.id  : ''
                    },
            error:       false,
            resp:        true,
            TypeError:   '',
            ValueError:  '',
            message:     '',
      }
    }
    static updateVaccineToEntity( response:  DosisUpdateResponse):DosisByIdEntity {
      return {
        _id:     response._id ?? {
                                      $oid: ''
                                  },
        error:      response.error ?? false,
        resp:       response.resp ?? false,
        TypeError:  response.TypeError ?? '',
        ValueError: response.ValueError ?? '',
        message:    response.message ?? '',
      }
    }

    static vaccineByIDToEntity( response:  DosisByIDResponse):DosisByIdEntity {
      return {
        _id:             response._id,
        name:            response.name,
        age_frequency:  response.age_frequency,
        expires_in_days: response.expires_in_days,
        status:          response.status,
        rowReporte:     response.rowReporte,
        columReporte:    response.columReporte ?? '',
        vacinne_id:      response.vaccine._id.$oid ?? '',
      }
    }
     
  //   static dosisByvaccineByIDToEntity(response: DosisByIDResponse): DosisEntity[] {
  //     // Verificar si response.dosis_ids está definido y no es un array vacío
  //     if (response.dosis_ids && response.dosis_ids.length > 0) {
  //         // Mapear los datos de DosisByIDResponse a DosisEntity
  //         return response.dosis_ids.map(dosis => {
  //             return {
  //               //DATOS DE LA VACUNA
  //                 vaccineID:               response._id,
  //                 vaccineName:             response.name,
  //                 vaccineDescription:      response.description,
  //                 vaccineDisease_prevents: response.disease_prevents,
  //                 vaccineApplication_age:  response.application_age,
  //                 vaccineIsChildren:       response.isChildren,
  //                 vaccineStatus:          response.status,
  //               //DATOS DE LA DOSIS
  //                 _id: dosis._id,
  //                 vacinne_id:response._id.$oid, // Asignar el id de la vacuna de la respuesta original
  //                 name: dosis.name,
  //                 age_frequency: dosis.age_frequency,
  //                 status: dosis.status,
  //                 columReporte: dosis.columReporte,
  //                 rowReporte: dosis.rowReporte,
  //                 expires_in_days: dosis.expires_in_days
  //             };
  //         });
  //     } else {
  //         // Devolver un array vacío si response.dosis_ids no está definido o es un array vacío
  //         return [];
  //     }
  // }
  

}

 